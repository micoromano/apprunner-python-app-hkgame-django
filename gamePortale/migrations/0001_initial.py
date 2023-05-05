# Generated by Django 4.2 on 2023-05-02 16:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Credentials',
            fields=[
                ('id', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('groupName', models.CharField(max_length=200)),
                ('password', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='info',
            fields=[
                ('id', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('nome', models.CharField(max_length=30)),
                ('cognome', models.CharField(max_length=30)),
                ('attivo', models.CharField(max_length=30)),
                ('username', models.CharField(max_length=30)),
                ('password', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='UserItem',
            fields=[
                ('id', models.CharField(max_length=30, primary_key=True, serialize=False)),
                ('Info', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gamePortale.info')),
            ],
        ),
    ]