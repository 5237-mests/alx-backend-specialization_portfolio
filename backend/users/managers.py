from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _ # in deferent language 

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password, **kwargs):
        if not username or not password:
            raise ValueError(_("The Email and or password must be set"))
        user = self.model(username=username, **kwargs)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, username, password, **kwargs):
        kwargs.setdefault("is_staff", True)
        kwargs.setdefault("is_superuser", True)
        kwargs.setdefault("is_active", True)
        return self.create_user(username, password, **kwargs)
    