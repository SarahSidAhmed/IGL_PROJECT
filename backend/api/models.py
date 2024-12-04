from django.db import models

# Create your models here.
class User(models.Model):
    SSN = models.CharField(max_length=9)
    QR_code = models.CharField(max_length=100)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    date_naissance = models.DateField()
    adresse = models.CharField(max_length=100)
    telephone = models.CharField(max_length=8)
    email = models.EmailField()
    mutuelle = models.CharField(max_length=50)
    medecin_traitant = models.CharField(max_length=50)
    personne_contact = models.CharField(max_length=50)

    def __str__(self):
        return self.nom + ' ' + self.prenom