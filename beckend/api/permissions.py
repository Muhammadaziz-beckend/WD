from rest_framework import permissions

from bike.models import Bike


class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, bike: Bike):
        return bool(
            request.method in permissions.SAFE_METHODS or
            request.user == bike.user
        )