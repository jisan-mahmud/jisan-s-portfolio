from .models import AboutParagraph, AboutStat, Interest


def get_about_data():
    return {
        "stats": AboutStat.objects.filter(is_active=True),
        "paragraphs": AboutParagraph.objects.filter(is_active=True),
        "interests": Interest.objects.filter(is_active=True),
    }
