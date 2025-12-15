from rest_framework import serializers
from .models import Wallet, Transaction

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class WalletSerializer(serializers.ModelSerializer):
    transactions = serializers.SerializerMethodField()

    class Meta:
        model = Wallet
        fields = ['balance', 'transactions']

    def get_transactions(self, obj):
        transactions = Transaction.objects.filter(wallet=obj).order_by('-created_at')[:10]
        return TransactionSerializer(transactions, many=True).data
