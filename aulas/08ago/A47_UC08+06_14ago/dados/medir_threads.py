# ---------------------------------------------------------------
# medir_threads.py  -  Aula 47, Arquitetura de Computadores e GPU
#
# Este programa faz a MESMA conta pesada de tres jeitos diferentes
# e mede quanto tempo cada jeito demora NA SUA MAQUINA.
#
# Voce so precisa rodar e anotar os tres tempos.
# Depois mude o numero em TAREFAS e rode de novo.
# ---------------------------------------------------------------

import time
import threading
from multiprocessing import Process

TAMANHO = 8_000_000   # tamanho da conta. Se demorar demais, diminua.
TAREFAS = 4           # <<< MUDE AQUI: 1, 2, 4, 8


def conta_pesada(n):
    """Soma o quadrado de todos os numeros ate n. So serve para dar trabalho."""
    total = 0
    for i in range(n):
        total += i * i
    return total


def medir(nome, fabrica):
    inicio = time.time()
    trabalhadores = [fabrica() for _ in range(TAREFAS)]
    for t in trabalhadores:
        t.start()
    for t in trabalhadores:
        t.join()
    print(f"{nome:<32} {time.time() - inicio:6.2f} segundos")


if __name__ == "__main__":
    print(f"\nFazendo a conta {TAREFAS} vezes, de tres jeitos.\n")

    inicio = time.time()
    for _ in range(TAREFAS):
        conta_pesada(TAMANHO)
    print(f"{'1 - uma de cada vez':<32} {time.time() - inicio:6.2f} segundos")

    medir("2 - com THREADS", lambda: threading.Thread(target=conta_pesada, args=(TAMANHO,)))
    medir("3 - com PROCESSOS", lambda: Process(target=conta_pesada, args=(TAMANHO,)))

    print("\nAnote os tres tempos na sua folha.\n")
