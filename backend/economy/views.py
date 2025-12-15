from rest_framework import generics, permissions
from .models import Wallet
from .serializers import WalletSerializer

class WalletView(generics.RetrieveAPIView):
    serializer_class = WalletSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.wallet
