# Generated by Django 4.1.7 on 2023-03-15 21:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('questions', '0008_alter_examresult_score'),
    ]

    operations = [
        migrations.AlterField(
            model_name='examresult',
            name='job',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='questions.job', unique=True),
        ),
        migrations.AlterField(
            model_name='examresult',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, unique=True),
        ),
    ]
