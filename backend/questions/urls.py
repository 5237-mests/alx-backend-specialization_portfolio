from django.urls import path
from. import views
app_name = "questions"
urlpatterns = [
     # User CRUD
    path("api/users/", views.UserListCreateView.as_view(), name="create-list"),
    path("api/users/<int:pk>/", views.UserDeleteUpdateViewAPIVIew.as_view(), name="del-up-get"),
    # Job CRUD
    path("api/jobs/", views.JobListCreateAPIView.as_view(), name="jobs"),
    path("api/jobs/<int:pk>/", views.JobUpdateDeleteGetAPIVIew.as_view(), name="get-job"),
    # Question CRUD
    path("api/questions/", views.QuestionListCreateAPIView.as_view(), name="questions"),
    path("api/questions/<int:pk>/", views.QuestionListAPIViewByJobID.as_view(), name="question-by-job-id"),
    path("api/questions/<str:jobCode>/", views.QuestionListAPIViewByJobCode.as_view(), name="question-by-job-code"),
    
    path("api/exam-result/", views.ExamResultListCreateView.as_view(), name="exam-result"),
    path("api/exam-result/<int:pk>/", views.ExamResultDeleteUpdateGetAPIView.as_view(), name="exam-detail"),

    path("api/exam-register/", views.ExamRegisterAPIView.as_view(), name="exam-register"),
    # Exam Candidates
    path("api/exam-cand/", views.ExamCandiateListCreateView.as_view(), name="exam-cand-list"),
    path("api/exam-cand/<int:pk>/", views.ExamCandDeleteUpdateGetAPIView.as_view(), name="exam-can-detail"),
    # path("api/register/", views.UserLogin.as_view(), name="register"),
]