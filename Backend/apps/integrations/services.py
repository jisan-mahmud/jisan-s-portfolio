import urllib.parse

from .cache import cached
from .client import ExternalServiceError, IntegrationNotFound, get_json

LEETCODE_QUERY = """
query getUser($username: String!) {
  matchedUser(username: $username) {
    username
    profile { realName userAvatar ranking }
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    tagProblemCounts {
      advanced { tagName problemsSolved }
      intermediate { tagName problemsSolved }
      fundamental { tagName problemsSolved }
    }
  }
}
"""


def fetch_codeforces(handle):
    handle = (handle or "").strip()
    if not handle:
        raise IntegrationNotFound("A Codeforces handle is required.")

    def loader():
        encoded = urllib.parse.quote(handle, safe="")
        user_data = get_json(f"https://codeforces.com/api/user.info?handles={encoded}")
        if user_data.get("status") != "OK" or not user_data.get("result"):
            raise IntegrationNotFound(user_data.get("comment") or "Codeforces user not found.")
        contests = []
        try:
            rating_data = get_json(f"https://codeforces.com/api/user.rating?handle={encoded}")
            if rating_data.get("status") == "OK":
                contests = rating_data.get("result") or []
        except ExternalServiceError:
            contests = []
        return {"user": user_data["result"][0], "contests": contests}

    return cached(f"portfolio:codeforces:{handle.lower()}", loader)


def fetch_leetcode(username):
    username = (username or "").strip()
    if not username:
        raise IntegrationNotFound("A LeetCode username is required.")

    def loader():
        payload = {"query": LEETCODE_QUERY, "variables": {"username": username}}
        response = get_json(
            "https://leetcode.com/graphql",
            payload=payload,
            headers={"Content-Type": "application/json", "Referer": "https://leetcode.com"},
        )
        user = (response.get("data") or {}).get("matchedUser")
        if not user:
            raise IntegrationNotFound("LeetCode user not found.")

        counts = user.get("submitStatsGlobal", {}).get("acSubmissionNum", []) or []

        def solved(difficulty):
            return next((item.get("count", 0) for item in counts if item.get("difficulty") == difficulty), 0)

        tags = user.get("tagProblemCounts") or {}
        return {
            "username": user.get("username", username),
            "name": (user.get("profile") or {}).get("realName") or username,
            "avatar": (user.get("profile") or {}).get("userAvatar") or "",
            "ranking": (user.get("profile") or {}).get("ranking") or 0,
            "easySolved": solved("Easy"),
            "mediumSolved": solved("Medium"),
            "hardSolved": solved("Hard"),
            "totalSolved": solved("All"),
            "problemTags": {
                "advanced": tags.get("advanced") or [],
                "intermediate": tags.get("intermediate") or [],
                "fundamental": tags.get("fundamental") or [],
            },
        }

    return cached(f"portfolio:leetcode:{username.lower()}", loader)
