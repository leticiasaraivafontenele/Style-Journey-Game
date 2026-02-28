#!/bin/bash

# Script para matar processo usando uma porta específica
# Uso: ./scripts/kill-port.sh [porta]

PORT=${1:-5000}

echo "🔍 Procurando processo usando porta $PORT..."

PID=$(lsof -ti:$PORT)

if [ -z "$PID" ]; then
    echo "✅ Nenhum processo encontrado na porta $PORT"
    exit 0
fi

echo "🔴 Processo encontrado: PID $PID"
echo "🔨 Matando processo..."

kill -9 $PID

sleep 1

if lsof -ti:$PORT > /dev/null 2>&1; then
    echo "❌ Falha ao matar processo"
    exit 1
else
    echo "✅ Porta $PORT liberada com sucesso!"
    exit 0
fi
