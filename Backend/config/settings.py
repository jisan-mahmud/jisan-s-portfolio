from pathlib import Path

from decouple import Csv, config
import dj_database_url
from django.core.exceptions import ImproperlyConfigured

from apps.core.admin_navigation import model_permission

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config("DJANGO_SECRET_KEY", default="dev-insecure-secret-key-change-me")
DEBUG = config("DEBUG", cast=bool, default=True)

if not DEBUG and SECRET_KEY.startswith("dev-insecure"):
    raise ImproperlyConfigured("Set DJANGO_SECRET_KEY to a secure value when DEBUG is disabled.")

ALLOWED_HOSTS = config(
    "ALLOWED_HOSTS",
    cast=Csv(),
    default="localhost,127.0.0.1,0.0.0.0,testserver",
)

INSTALLED_APPS = [
    "unfold",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "drf_spectacular",
    "django_filters",
    "apps.core",
    "apps.about",
    "apps.resume",
    "apps.skills",
    "apps.projects",
    "apps.integrations",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

if not DEBUG:
    MIDDLEWARE.insert(1, "whitenoise.middleware.WhiteNoiseMiddleware")

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

UNFOLD = {
    "SITE_TITLE": "Portfolio Admin",
    "SITE_HEADER": "Jisan Mahmud",
    "SITE_SUBHEADER": "Portfolio content management",
    "SITE_URL": "/",
    "SITE_SYMBOL": "dashboard_customize",
    "DASHBOARD_CALLBACK": "apps.core.admin_dashboard.dashboard_callback",
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": False,
        "navigation": [
            {
                "title": "Overview",
                "separator": True,
                "items": [
                    {
                        "title": "Dashboard",
                        "icon": "dashboard",
                        "link": "/admin/",
                    },
                ],
            },
            {
                "title": "Site",
                "separator": True,
                "items": [
                    {
                        "title": "Site profile",
                        "icon": "person",
                        "link": "/admin/core/siteprofile/",
                        "permission": model_permission("core", "siteprofile"),
                    },
                    {
                        "title": "Social links",
                        "icon": "share",
                        "link": "/admin/core/sociallink/",
                        "permission": model_permission("core", "sociallink"),
                    },
                ],
            },
            {
                "title": "Portfolio content",
                "separator": True,
                "items": [
                    {
                        "title": "Projects",
                        "icon": "work",
                        "link": "/admin/projects/project/",
                        "permission": model_permission("projects", "project"),
                    },
                    {
                        "title": "Tags",
                        "icon": "sell",
                        "link": "/admin/projects/tag/",
                        "permission": model_permission("projects", "tag"),
                    },
                    {
                        "title": "Technologies",
                        "icon": "code",
                        "link": "/admin/projects/tech/",
                        "permission": model_permission("projects", "tech"),
                    },
                    {
                        "title": "Experience",
                        "icon": "work_history",
                        "link": "/admin/resume/experience/",
                        "permission": model_permission("resume", "experience"),
                    },
                    {
                        "title": "Education",
                        "icon": "school",
                        "link": "/admin/resume/education/",
                        "permission": model_permission("resume", "education"),
                    },
                    {
                        "title": "Skill categories",
                        "icon": "category",
                        "link": "/admin/skills/skillcategory/",
                        "permission": model_permission("skills", "skillcategory"),
                    },
                    {
                        "title": "Skills",
                        "icon": "psychology",
                        "link": "/admin/skills/skill/",
                        "permission": model_permission("skills", "skill"),
                    },
                    {
                        "title": "About stats",
                        "icon": "monitoring",
                        "link": "/admin/about/aboutstat/",
                        "permission": model_permission("about", "aboutstat"),
                    },
                    {
                        "title": "About paragraphs",
                        "icon": "article",
                        "link": "/admin/about/aboutparagraph/",
                        "permission": model_permission("about", "aboutparagraph"),
                    },
                    {
                        "title": "Interests",
                        "icon": "interests",
                        "link": "/admin/about/interest/",
                        "permission": model_permission("about", "interest"),
                    },
                ],
            },
            {
                "title": "Access",
                "separator": True,
                "items": [
                    {
                        "title": "Users",
                        "icon": "group",
                        "link": "/admin/auth/user/",
                        "permission": model_permission("auth", "user"),
                    },
                    {
                        "title": "Groups",
                        "icon": "groups",
                        "link": "/admin/auth/group/",
                        "permission": model_permission("auth", "group"),
                    },
                ],
            },
        ],
    },
}

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': config('POSTGRES_DB'),
#         'USER': config('POSTGRES_USER'),
#         'PASSWORD': config('POSTGRES_PASSWORD'),
#         'HOST': config('POSTGRES_HOST'),
#         'PORT': config('POSTGRES_PORT'),
#     }
# }

DATABASES = {
    "default": dj_database_url.parse(
        config('DATABASE_URL'),
        conn_max_age=0,
    )
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = config("TIME_ZONE", default="Asia/Dhaka")
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

R2_ACCOUNT_ID = config("R2_ACCOUNT_ID", default="").strip()
R2_ACCESS_KEY_ID = config("R2_ACCESS_KEY_ID", default="").strip()
R2_SECRET_ACCESS_KEY = config("R2_SECRET_ACCESS_KEY", default="").strip()
R2_BUCKET_NAME = config("R2_BUCKET_NAME", default="").strip()
R2_PUBLIC_DOMAIN = config("R2_PUBLIC_DOMAIN", default="").strip()

R2_SETTINGS = {
    "R2_ACCOUNT_ID": R2_ACCOUNT_ID,
    "R2_ACCESS_KEY_ID": R2_ACCESS_KEY_ID,
    "R2_SECRET_ACCESS_KEY": R2_SECRET_ACCESS_KEY,
    "R2_BUCKET_NAME": R2_BUCKET_NAME,
    "R2_PUBLIC_DOMAIN": R2_PUBLIC_DOMAIN,
}
R2_ENABLED = any(R2_SETTINGS.values())

if R2_ENABLED:
    missing_r2_settings = [name for name, value in R2_SETTINGS.items() if not value]
    if missing_r2_settings:
        raise ImproperlyConfigured(
            "Cloudflare R2 storage requires all R2 settings; missing: "
            + ", ".join(missing_r2_settings)
        )

STORAGES = {
    "default": (
        {
            "BACKEND": "storages.backends.s3.S3Storage",
            "OPTIONS": {
                "access_key": R2_ACCESS_KEY_ID,
                "secret_key": R2_SECRET_ACCESS_KEY,
                "bucket_name": R2_BUCKET_NAME,
                "endpoint_url": (
                    f"https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com"
                ),
                "region_name": "auto",
                "signature_version": "s3v4",
                "default_acl": None,
                "querystring_auth": False,
                "file_overwrite": False,
                "custom_domain": R2_PUBLIC_DOMAIN,
            },
        }
        if R2_ENABLED
        else {"BACKEND": "django.core.files.storage.FileSystemStorage"}
    ),
    "staticfiles": {
        "BACKEND": (
            "django.contrib.staticfiles.storage.StaticFilesStorage"
            if DEBUG
            else "whitenoise.storage.CompressedManifestStaticFilesStorage"
        )
    },
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REDIS_CACHE_URL = config("REDIS_URL", default=config("REDIS_CACHE_URL", default=""))
if REDIS_CACHE_URL:
    CACHES = {
        "default": {
            "BACKEND": "django_redis.cache.RedisCache",
            "LOCATION": REDIS_CACHE_URL,
            "OPTIONS": {
                "CLIENT_CLASS": "django_redis.client.DefaultClient",
                "IGNORE_EXCEPTIONS": True,
            },
        }
    }
else:
    CACHES = {"default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"}}

PORTFOLIO_CACHE_TTL = config("PORTFOLIO_CACHE_TTL", cast=int, default=300)
PORTFOLIO_CACHE_VERSION = config("PORTFOLIO_CACHE_VERSION", default="1")
INTEGRATION_TIMEOUT = config("INTEGRATION_TIMEOUT", cast=int, default=12)
INTEGRATION_CACHE_TTL = config("INTEGRATION_CACHE_TTL", cast=int, default=900)
INTEGRATION_STALE_TTL = config("INTEGRATION_STALE_TTL", cast=int, default=86400)

CORS_ALLOWED_ORIGINS = config(
    "CORS_ALLOWED_ORIGINS",
    cast=Csv(),
    default="http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,http://127.0.0.1:4173",
)
CORS_ALLOW_ALL_ORIGINS = config("CORS_ALLOW_ALL_ORIGINS", cast=bool, default=False)
CORS_ALLOW_CREDENTIALS = False

CSRF_TRUSTED_ORIGINS = config(
    "CSRF_TRUSTED_ORIGINS",
    cast=Csv(),
    default="http://localhost:5173,http://127.0.0.1:5173,http://localhost:8007,http://127.0.0.1:8007",
)

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

SPECTACULAR_SETTINGS = {
    "TITLE": "Jisan Mahmud Portfolio API",
    "DESCRIPTION": "Public API for the Jisan Mahmud portfolio website.",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    "TAGS": [
        {"name": "Portfolio", "description": "Portfolio content and aggregated home data."},
        {"name": "Integrations", "description": "Cached Codeforces and LeetCode data."},
    ],
}

SERVE_MEDIA = config("SERVE_MEDIA", cast=bool, default=True)
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "default": {
            "format": "{levelname} {asctime} {name} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "default",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": config("LOG_LEVEL", default="INFO"),
    },
    "loggers": {
        "django.request": {
            "handlers": ["console"],
            "level": "WARNING",
            "propagate": False,
        },
        "apps": {
            "handlers": ["console"],
            "level": config("APP_LOG_LEVEL", default="INFO"),
            "propagate": False,
        },
    },
}
