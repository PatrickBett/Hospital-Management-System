# Generated by Django 5.2 on 2025-06-12 21:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0007_medicine'),
    ]

    operations = [
        migrations.RenameField(
            model_name='medicine',
            old_name='added_on',
            new_name='date_added',
        ),
    ]
