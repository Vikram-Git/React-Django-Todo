from todo.settings.base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = []


# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Cross Origin Resource Sharing

CORS_ORIGIN_WHITELIST = ''


try:
    from todo.settings.local import *
except:
    pass
