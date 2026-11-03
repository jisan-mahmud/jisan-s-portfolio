import json
import logging
import urllib.error
import urllib.request

from django.conf import settings
from rest_framework import status
from rest_framework.exceptions import APIException

logger = logging.getLogger(__name__)

USER_AGENT = "Mozilla/5.0 (compatible; JisanPortfolioBot/1.0)"


class ExternalServiceError(APIException):
    status_code = status.HTTP_502_BAD_GATEWAY
    default_detail = "The external service is currently unavailable."
    default_code = "external_service_error"


class IntegrationNotFound(APIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = "The requested user was not found."
    default_code = "not_found"


def get_json(url, *, payload=None, headers=None):
    request_headers = {"User-Agent": USER_AGENT, "Accept": "application/json"}
    if headers:
        request_headers.update(headers)
    data = None
    method = "GET"
    if payload is not None:
        data = json.dumps(payload).encode("utf-8")
        method = "POST"
    request = urllib.request.Request(url, data=data, headers=request_headers, method=method)
    try:
        with urllib.request.urlopen(request, timeout=settings.INTEGRATION_TIMEOUT) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        detail = "External service returned an error."
        try:
            body = exc.read().decode("utf-8")
            parsed = json.loads(body)
            detail = parsed.get("comment") or parsed.get("error") or detail
        except Exception:
            pass
        raise ExternalServiceError(detail) from exc
    except (urllib.error.URLError, TimeoutError, ValueError) as exc:
        logger.warning("External request failed for %s: %s", url, exc)
        raise ExternalServiceError() from exc
