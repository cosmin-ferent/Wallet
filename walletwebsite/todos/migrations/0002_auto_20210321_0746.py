# Generated by Django 3.1.3 on 2021-03-21 05:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Option',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('option', models.CharField(max_length=100)),
            ],
        ),
        migrations.AlterField(
            model_name='todo',
            name='completed',
            field=models.CharField(max_length=100),
        ),
    ]
