# Generated by Django 4.1.7 on 2023-03-15 12:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0005_rename_jobid_examcandidates_job_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='examresult',
            old_name='userId',
            new_name='user',
        ),
    ]
