from pathlib import Path

from decouple import config
from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand
from django.db import transaction

from apps.about.models import AboutParagraph, AboutStat, Interest
from apps.core.models import SiteProfile, SocialLink
from apps.projects.models import CaseStudy, Project, ProjectFeature, Tag, Tech
from apps.resume.models import Education, EducationHighlight, Experience, ExperienceHighlight
from apps.skills.models import Skill, SkillCategory

IMAGE_DIRS = [
    Path(settings.BASE_DIR) / "seed_assets",
    Path(settings.BASE_DIR).parent / "Frontend" / "public" / "images",
]

PROFILE = {
    "full_name": "Jisan Mahmud",
    "headline": "Backend Developer",
    "roles": [
        "Backend Developer",
        "Django & DRF Engineer",
        "Full Stack Developer",
        "REST API Specialist",
    ],
    "intro_skills": ["Python", "Django", "REST APIs", "React", "PostgreSQL", "Docker"],
    "bio_short": "Building scalable REST APIs and production-grade web systems with Python, Django, and modern backend tooling.",
    "bio_long": (
        "I work with technologies such as React, Tailwind CSS, Celery, Redis, Docker, and Nginx, "
        "with a strong emphasis on backend performance, system design, and reliability.\n\n"
        "I actively participate in coding contests and build projects to sharpen my problem-solving skills. "
        "Long-term, I'm driven to build impactful products and contribute to world-class engineering teams."
    ),
    "avatar_url": "/images/jisan-mahmud.png",
    "resume_url": "https://drive.google.com/file/d/1V17wK80xyEYZCGdbbmqR7eEvG5hxZndA/view?usp=sharing",
    "location": "Dhaka, Bangladesh",
    "email": "jisan.mahmud203@gmail.com",
    "availability_text": "Available for opportunities",
    "is_available": True,
}

SOCIALS = [
    ("GitHub", "https://github.com/jisan-mahmud", "github", 0),
    ("LinkedIn", "https://www.linkedin.com/in/jisanmahmud/", "linkedin", 1),
    ("Twitter", "https://x.com/jisan__mahmud", "twitter", 2),
    ("Email", "mailto:jisan.mahmud203@gmail.com", "email", 3),
]

STATS = [
    ("Experience", "2+ Years", "briefcase", 0),
    ("Focus", "Backend Dev", "code", 1),
    ("Projects", "10+ Built", "rocket", 2),
    ("Location", "Dhaka, BD", "location", 3),
]

PARAGRAPHS = [
    (
        "I'm a Backend Developer focused on building scalable, high-performance web systems using Django, "
        "PostgreSQL, and REST APIs. I have hands-on experience designing and deploying production-grade "
        "full-stack applications, combining clean architecture with practical problem-solving.",
        False,
        0,
    ),
    (
        "I work with technologies such as React, Tailwind CSS, Celery, Redis, Docker, and Nginx, with a "
        "strong emphasis on backend performance, system design, and reliability.",
        True,
        1,
    ),
    (
        "I actively participate in coding contests and build projects to sharpen my problem-solving skills. "
        "Long-term, I'm driven to build impactful products and contribute to world-class engineering teams.",
        True,
        2,
    ),
]

INTERESTS = [
    ("System Design", "blue", 0),
    ("Competitive Programming", "purple", 1),
    ("Cloud Computing", "orange", 2),
    ("AI / ML", "cyan", 3),
    ("Open Source", "green", 4),
]

EXPERIENCES = [
    {
        "title": "Backend Developer",
        "company": "Softvence Agency",
        "stack": "Python · Django",
        "period": "Nov 2025 – Jul 2026",
        "employment_type": "Full-time",
        "location": "Mohakhali, Dhaka, Bangladesh",
        "order": 0,
        "highlights": [
            "Built production-grade REST APIs with JWT authentication, Google OAuth, and RBAC for multi-role systems.",
            "Implemented real-time bidirectional messaging using Django Channels for scalable user communication.",
            "Collaborated with frontend and AI teams to deliver production-ready features and improve system responsiveness.",
            "Automated CI/CD pipelines using GitHub Actions, reducing manual deployment effort and improving release reliability.",
        ],
    },
    {
        "title": "Full Stack Developer",
        "company": "Self-Employed",
        "stack": "Django · React · PostgreSQL",
        "period": "Jan 2023 – Present",
        "employment_type": "Freelance",
        "location": "",
        "order": 1,
        "highlights": [
            "Built and deployed full-stack web applications using Django, React, and PostgreSQL.",
            "Delivered client-specific solutions with focus on performance, scalability, and clean architecture.",
            "Integrated modern APIs and third-party services to extend application functionality.",
        ],
    },
]

EDUCATION = [
    {
        "degree": "B.Sc. in Computer Science & Engineering",
        "institution": "Uttara University",
        "period": "Expected: 2029",
        "status": "Ongoing",
        "location": "Uttara, Dhaka, Bangladesh",
        "order": 0,
        "highlights": [
            "Coursework: Data Structures & Algorithms, Database Systems, Operating Systems, Backend Development.",
        ],
    },
    {
        "degree": "Diploma in Computer Science & Technology",
        "institution": "Mymensingh Polytechnic Institute",
        "period": "Completed",
        "status": "Completed",
        "location": "Mymensingh, Bangladesh",
        "order": 1,
        "highlights": [
            "Programming Fundamentals, Data Structures, Computer Networks.",
            "Built strong self-learning ability through projects and continuous practice beyond curriculum.",
            "Focused on real-world software development and backend systems.",
        ],
    },
]

SKILL_CATEGORIES = [
    {
        "label": "Languages",
        "color": "blue",
        "order": 0,
        "skills": [
            ("Python", "python", ""),
            ("JavaScript", "javascript", ""),
            ("C", "c", ""),
            ("C++", "cpp", ""),
        ],
    },
    {
        "label": "Frontend",
        "color": "cyan",
        "order": 1,
        "skills": [
            ("React", "react", ""),
            ("HTML5", "html5", ""),
            ("CSS3", "css3", ""),
            ("Tailwind CSS", "tailwind", ""),
        ],
    },
    {
        "label": "Backend",
        "color": "green",
        "order": 2,
        "skills": [
            ("Django", "django", ""),
            (
                "DRF",
                "drf",
                "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/djangorest/djangorest-original-wordmark.svg",
            ),
            ("JWT", "jwt", ""),
            ("PostgreSQL", "postgresql", ""),
        ],
    },
    {
        "label": "DevOps & Cloud",
        "color": "orange",
        "order": 3,
        "skills": [
            ("AWS", "aws", ""),
            ("Docker", "docker", ""),
            ("Nginx", "nginx", ""),
            ("Linux", "linux", ""),
        ],
    },
    {
        "label": "Tools",
        "color": "purple",
        "order": 4,
        "skills": [
            ("Git", "git", ""),
            ("Postman", "postman", ""),
            ("Swagger", "swagger", ""),
        ],
    },
]

PROJECTS = [
    {
        "slug": "picgenre",
        "title": "Picgenre - Automate Your Stock Success",
        "short_desc": "Transform your microstock workflow with AI-powered tools that make metadata management fast, efficient, and more profitable.",
        "description": (
            "Picgenre is a SaaS platform built for microstock contributors who need to manage large volumes of "
            "image metadata efficiently. It uses AI to auto-generate titles, descriptions, and keywords for stock "
            "images — dramatically reducing the time spent on manual metadata entry.\n\n"
            "The platform integrates with major stock agencies and provides a dashboard to track submission status, "
            "earnings, and performance analytics. Built with a focus on reliability and speed, it handles bulk "
            "uploads and processes thousands of images per session."
        ),
        "image_file": "picgenre_project.jpg",
        "live_link": "https://picgenre-2-0-frontend.vercel.app/",
        "github_link": "",
        "tags": ["AI", "Automation", "SaaS", "Python", "Django"],
        "features": [
            "AI-powered metadata generation (title, description, keywords)",
            "Bulk image upload and processing",
            "Multi-agency submission support",
            "Performance analytics dashboard",
            "REST API for third-party integrations",
        ],
        "tech": ["Python", "Django", "Django REST Framework", "PostgreSQL", "Celery", "Redis", "React", "Tailwind CSS"],
        "year": "2024",
        "role": "Full Stack Developer",
        "is_featured": True,
        "order": 0,
        "case_study": {
            "problem": "Microstock contributors were spending hours manually writing titles, descriptions, and keywords for each image before uploading to agencies like Shutterstock and Adobe Stock. With hundreds of images per batch, this became a major bottleneck that directly impacted earnings and submission speed.",
            "solution": "I built Picgenre as a SaaS platform that integrates an AI pipeline to analyze image content and auto-generate optimized metadata. The backend uses Celery workers to process images asynchronously, so users can upload a batch and come back to completed metadata. A React dashboard lets users review, edit, and bulk-submit to multiple agencies in one click.",
            "outcome": "Contributors reported saving 3–5 hours per batch upload. The platform handles thousands of images per session without performance degradation. Submission approval rates improved due to better-optimized keywords generated by the AI model.",
        },
    },
    {
        "slug": "deeperase",
        "title": "DeepErase: AI-Powered Background Removal Tool",
        "short_desc": "DeepErase is an intuitive GUI desktop application designed to help users effortlessly remove backgrounds from images using advanced AI technology.",
        "description": (
            "DeepErase is a cross-platform desktop application that leverages deep learning models to remove image "
            "backgrounds with high accuracy. It provides a clean, user-friendly GUI built with Tkinter, making "
            "AI-powered background removal accessible without any technical knowledge.\n\n"
            "The app processes images locally — no internet connection required — ensuring privacy and fast "
            "performance. It supports batch processing and exports results in PNG format with transparent backgrounds."
        ),
        "image_file": "deeperase_project.jpg",
        "live_link": "",
        "github_link": "https://github.com/jisan-mahmud/Background-remover-gui-app",
        "tags": ["AI", "Desktop", "Python", "Computer Vision"],
        "features": [
            "AI-based background removal using rembg",
            "Offline processing — no internet required",
            "Batch image processing support",
            "PNG export with transparent background",
            "Simple drag-and-drop GUI",
        ],
        "tech": ["Python", "Tkinter", "rembg", "Pillow", "PyInstaller"],
        "year": "2023",
        "role": "Solo Developer",
        "is_featured": True,
        "order": 1,
        "case_study": {
            "problem": "Most background removal tools are web-based and require uploading images to third-party servers, raising privacy concerns and adding latency. Users working with sensitive or large volumes of images needed a fast, offline solution they could run locally.",
            "solution": "I built DeepErase as a standalone desktop app using Python and Tkinter. It uses the rembg library backed by a U2-Net deep learning model to remove backgrounds entirely on-device. The GUI supports drag-and-drop and batch processing, and the app is packaged with PyInstaller so no Python installation is needed.",
            "outcome": "The app processes a single image in under 2 seconds on average hardware with no internet dependency. It was well received on GitHub and used by designers and photographers who needed a private, fast alternative to online tools.",
        },
    },
    {
        "slug": "ingredientai",
        "title": "IngredientAI: Instant Recipes from Food Images",
        "short_desc": "IngredientAI converts food images into detailed recipes and provides step-by-step instructions for making them.",
        "description": (
            "IngredientAI is a web application that uses computer vision and AI to identify food ingredients from "
            "uploaded images and generate complete recipes with step-by-step cooking instructions.\n\n"
            "Users can upload a photo of ingredients they have on hand, and the system identifies them and suggests "
            "multiple recipes. The backend uses a vision model for ingredient detection and an LLM for recipe "
            "generation, all served through a Django REST API."
        ),
        "image_file": "ingredientai_project.jpg",
        "live_link": "https://ingredientai.pythonanywhere.com/",
        "github_link": "https://github.com/jisan-mahmud/ingredientai",
        "tags": ["AI", "Web", "Computer Vision", "Django"],
        "features": [
            "Food ingredient detection from images",
            "AI-generated recipes with step-by-step instructions",
            "Multiple recipe suggestions per upload",
            "REST API backend",
            "Responsive web interface",
        ],
        "tech": ["Python", "Django", "Django REST Framework", "OpenAI API", "React", "Tailwind CSS", "PostgreSQL"],
        "year": "2024",
        "role": "Full Stack Developer",
        "is_featured": True,
        "order": 2,
        "case_study": {
            "problem": "People often have random ingredients at home but don't know what to cook with them. Searching for recipes manually requires knowing ingredient names and browsing multiple sites. There was no quick way to just take a photo and get a recipe instantly.",
            "solution": "I built IngredientAI to bridge this gap. The user uploads a photo, the backend sends it to a vision model to identify ingredients, then passes the result to an LLM to generate multiple complete recipes with step-by-step instructions. The Django REST API handles the pipeline and the React frontend provides a clean, fast interface.",
            "outcome": "The app successfully identifies common ingredients with high accuracy and generates contextually relevant recipes in under 5 seconds. It demonstrated a practical end-to-end AI pipeline combining computer vision and language models in a single user-facing product.",
        },
    },
    {
        "slug": "ecare",
        "title": "Ecare - Appointment Booking System",
        "short_desc": "The Appointment Booking System for the eCare Hospital Management System streamlines scheduling appointments between patients and doctors.",
        "description": (
            "Ecare is a hospital management system focused on streamlining the appointment booking process between "
            "patients and doctors. It provides role-based access for patients, doctors, and admins with a clean "
            "interface for managing schedules, appointments, and medical records.\n\n"
            "The backend is built with Django REST Framework, featuring JWT authentication, real-time notifications "
            "via Django Channels, and a comprehensive admin panel for hospital staff."
        ),
        "image_file": "ecare_project.jpg",
        "live_link": "",
        "github_link": "https://github.com/jisan-mahmud/ecare_backend",
        "tags": ["Backend", "Web", "Healthcare", "Django"],
        "features": [
            "Role-based access control (Patient, Doctor, Admin)",
            "Real-time appointment notifications",
            "Doctor schedule and availability management",
            "Medical records and history tracking",
            "JWT authentication",
        ],
        "tech": ["Python", "Django", "Django REST Framework", "PostgreSQL", "Django Channels", "Redis", "JWT"],
        "year": "2023",
        "role": "Backend Developer",
        "is_featured": True,
        "order": 3,
        "case_study": {
            "problem": "Hospital appointment systems are often manual or paper-based, leading to double bookings, missed appointments, and poor communication between patients and doctors. Staff had no centralized way to manage schedules or patient records efficiently.",
            "solution": "I designed and built the Ecare backend with a role-based architecture — patients book appointments, doctors manage their availability, and admins oversee the entire system. Django Channels with Redis powers real-time WebSocket notifications so both patients and doctors are instantly informed of booking changes. JWT handles secure, stateless authentication across all roles.",
            "outcome": "The system eliminated double-booking conflicts through database-level constraints and real-time schedule locking. The admin panel gave hospital staff full visibility into daily appointments and patient history, reducing manual coordination overhead significantly.",
        },
    },
]


class Command(BaseCommand):
    help = "Seed the portfolio database with the content currently hardcoded in the frontend."

    def add_arguments(self, parser):
        parser.add_argument(
            "--skip-images",
            action="store_true",
            help="Do not copy existing frontend images into Django media storage.",
        )

    @transaction.atomic
    def handle(self, *args, **options):
        skip_images = options["skip_images"]

        profile = SiteProfile.load()
        for field, value in PROFILE.items():
            setattr(profile, field, value)
        profile.codeforces_handle = (
            config("CODEFORCES_HANDLE", default="").strip()
            or profile.codeforces_handle
            or "jisa.mahmud20"
        )
        profile.leetcode_username = (
            config("LEETCODE_USERNAME", default="").strip()
            or profile.leetcode_username
            or "jisan-mahmud"
        )
        if not skip_images:
            self._attach_image(profile, "avatar", "jisan-mahmud.png")
        profile.save()

        for label, url, icon, order in SOCIALS:
            SocialLink.objects.update_or_create(
                label=label,
                defaults={"url": url, "icon_key": icon, "order": order, "is_active": True},
            )

        for label, value, icon, order in STATS:
            AboutStat.objects.update_or_create(
                label=label,
                defaults={"value": value, "icon_key": icon, "order": order, "is_active": True},
            )

        for index, (text, expanded_only, order) in enumerate(PARAGRAPHS):
            AboutParagraph.objects.update_or_create(
                order=order,
                defaults={"text": text, "expanded_only": expanded_only, "is_active": True},
            )

        for label, color, order in INTERESTS:
            Interest.objects.update_or_create(
                label=label,
                defaults={"color": color, "order": order, "is_active": True},
            )

        for item in EXPERIENCES:
            highlights = item["highlights"]
            experience_data = {key: value for key, value in item.items() if key != "highlights"}
            experience, _ = Experience.objects.update_or_create(
                title=item["title"],
                company=item["company"],
                defaults={**experience_data, "is_active": True},
            )
            experience.highlights.all().delete()
            ExperienceHighlight.objects.bulk_create(
                [
                    ExperienceHighlight(experience=experience, text=text, order=index)
                    for index, text in enumerate(highlights)
                ]
            )

        for item in EDUCATION:
            highlights = item["highlights"]
            education_data = {key: value for key, value in item.items() if key != "highlights"}
            education, _ = Education.objects.update_or_create(
                degree=item["degree"],
                institution=item["institution"],
                defaults={**education_data, "is_active": True},
            )
            education.highlights.all().delete()
            EducationHighlight.objects.bulk_create(
                [
                    EducationHighlight(education=education, text=text, order=index)
                    for index, text in enumerate(highlights)
                ]
            )

        for category in SKILL_CATEGORIES:
            skills = category["skills"]
            skill_category, _ = SkillCategory.objects.update_or_create(
                label=category["label"],
                defaults={
                    "color": category["color"],
                    "order": category["order"],
                    "is_active": True,
                },
            )
            for order, (name, icon_key, icon_url) in enumerate(skills):
                Skill.objects.update_or_create(
                    category=skill_category,
                    name=name,
                    defaults={"icon_key": icon_key, "icon_url": icon_url, "order": order, "is_active": True},
                )

        for item in PROJECTS:
            tags = item["tags"]
            tech = item["tech"]
            features = item["features"]
            case_study = item["case_study"]
            image_file = item["image_file"]
            project_data = {
                key: value
                for key, value in item.items()
                if key not in {"tags", "tech", "features", "case_study", "image_file"}
            }

            project, _ = Project.objects.update_or_create(
                slug=item["slug"],
                defaults={**project_data, "is_published": True, "image_url": ""},
            )
            project.tags.set([Tag.objects.get_or_create(name=name)[0] for name in tags])
            project.tech.set([Tech.objects.get_or_create(name=name)[0] for name in tech])
            project.features.all().delete()
            ProjectFeature.objects.bulk_create(
                [
                    ProjectFeature(project=project, text=text, order=index)
                    for index, text in enumerate(features)
                ]
            )
            CaseStudy.objects.update_or_create(project=project, defaults=case_study)

            if not skip_images:
                self._attach_image(project, "image", image_file)
            project.save()

        self.stdout.write(self.style.SUCCESS("Portfolio content seeded successfully."))

    def _attach_image(self, instance, field_name, filename):
        source = next((directory / filename for directory in IMAGE_DIRS if (directory / filename).exists()), None)
        if source is None:
            self.stdout.write(self.style.WARNING(f"Image not found, skipped: {filename}"))
            return
        field_file = getattr(instance, field_name)
        if field_file:
            return
        with source.open("rb") as handle:
            field_file.save(filename, File(handle), save=False)
