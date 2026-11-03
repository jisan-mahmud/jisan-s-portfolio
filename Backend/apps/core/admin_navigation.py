def model_permission(app_label, model_name):
    view_permission = f"{app_label}.view_{model_name}"
    change_permission = f"{app_label}.change_{model_name}"

    def has_model_access(request):
        return request.user.has_perm(view_permission) or request.user.has_perm(
            change_permission
        )

    return has_model_access
