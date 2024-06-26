"""
Django settings for KidneyLife project.

Generated by 'django-admin startproject' using Django 4.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
import os

from dotenv import load_dotenv

USE_X_FORWARDED_HOST = True
USE_X_FORWARDED_PORT = True
# could be redundant. todo: try deleting the line and test if the app works
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# Use 'development' settings by default
DJANGO_ENV = os.environ.get("DJANGO_ENV", "development")

if DJANGO_ENV == "production":
    load_dotenv(".prod.env")
else:
    load_dotenv(".dev.env")

DEBUG = os.environ.get("DEBUG", default=False)
SECRET_KEY = os.environ.get("SECRET_KEY")

# DB constants
DB_NAME = os.environ.get("POSTGRES_DB")
DB_USER = os.environ.get("POSTGRES_USER")
DB_PASSWORD = os.environ.get("POSTGRES_PASSWORD")
DB_HOST = os.environ.get("POSTGRES_HOST")
DB_PORT = os.environ.get("DB_PORT")

FE_PORT = os.environ.get("FE_PORT")
HOST = os.environ.get("SERVER_IP")

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


ALLOWED_HOSTS = ["localhost", "127.0.0.1", "0.0.0.0", HOST]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sessions",
    "debug_toolbar",
    "rest_framework",
    "corsheaders",
    "prediction",
]

MIDDLEWARE = [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

INTERNAL_IPS = [
    "127.0.0.1",
]

FORCE_SCRIPT_NAME = "/api"

CORS_ALLOWED_ORIGINS = [
    f"http://localhost:{FE_PORT}",
    # f"http://localhost:3000",
    f"http://127.0.0.1:{FE_PORT}",
    f"http://0.0.0.0:{FE_PORT}",
    " http://frontend:3000",
    f"http://{HOST}:80",
    f"http://www.{HOST}:80",
]


ROOT_URLCONF = "KidneyLife.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "KidneyLife.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases
DATABASES = {
    # "default": {
    #     "ENGINE": "django.db.backends.postgresql",
    #     "NAME": DB_NAME,
    #     "USER": DB_USER,
    #     "PASSWORD": DB_PASSWORD,
    #     "HOST": DB_HOST,
    #     "PORT": DB_PORT,
    # }
    "default": {
        "ENGINE": "django.db.backends.dummy",
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": (
        "rest_framework.renderers.JSONRenderer",
        "rest_framework.renderers.BrowsableAPIRenderer",
    ),
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
}

# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
