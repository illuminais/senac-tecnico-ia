# funcoes_abrigo.py
# Tecnico em IA - UC05 Python para IA - A49 - 21/08/2026
# Nome:

# ---------------------------------------------------------------
# PARTE 1: ja corrigidas no quadro. Nao precisa mexer.
# ---------------------------------------------------------------

def saudacao(nome):
    return f"Olá, {nome}"

def dobro(numero):
    return numero * 2

def passou_do_prazo(dias_no_abrigo, limite):
    return dias_no_abrigo > limite

def levar_guarda_chuva(chance_de_chuva, vai_de_carro):
    # atencao: vai_de_carro e TEXTO, "sim" ou "nao", vem do input
    if chance_de_chuva >= 90:
        return True
    elif chance_de_chuva >= 60 and vai_de_carro == "não":
        return True
    return False

def taxa_de_adocao(adotados, total):
    if total == 0:
        return 0
    return (adotados / total) * 100


# ---------------------------------------------------------------
# PARTE 2: agora e com voce. Escreva o corpo de cada funcao.
# Lembre: a funcao precisa DEVOLVER com return, nao so mostrar.
# ---------------------------------------------------------------

# 8. soma_dias(lista_de_dias) devolve a soma de todos os numeros da lista.
#    O acumulador nasce ANTES do for.
def soma_dias(lista_de_dias):
    pass  # apague esta linha e escreva sua solucao


# 9. contar_grandes(portes) devolve quantos textos da lista sao "grande".
def contar_grandes(portes):
    pass  # apague esta linha e escreva sua solucao


# 10. ficha(animal) recebe {"nome": "Rex", "porte": "grande"}
#     e devolve "Rex, porte grande".
def ficha(animal):
    pass  # apague esta linha e escreva sua solucao


# 11. contar_por_porte(animais, porte_procurado) recebe uma lista de
#     dicionarios e devolve quantos tem o porte procurado.
def contar_por_porte(animais, porte_procurado):
    pass  # apague esta linha e escreva sua solucao


# ---------------------------------------------------------------
# PARTE 3: testes. Rode o arquivo e confira o que aparece na tela.
# ---------------------------------------------------------------

dias = [10, 4, 7, 22, 3]
portes = ["grande", "pequeno", "grande", "medio", "grande"]
animais = [
    {"nome": "Rex", "porte": "grande"},
    {"nome": "Mel", "porte": "pequeno"},
    {"nome": "Thor", "porte": "grande"},
]

print("8 :", soma_dias(dias))                      # esperado: 46
print("9 :", contar_grandes(portes))               # esperado: 3
print("10:", ficha(animais[0]))                    # esperado: Rex, porte grande
print("11:", contar_por_porte(animais, "grande"))  # esperado: 2


# ---------------------------------------------------------------
# PARTE 4: encadeamento. A saida de uma funcao vira a entrada da outra.
# ---------------------------------------------------------------

# Versao com variavel no meio:
quantos_grandes = contar_grandes(portes)
porcentagem = taxa_de_adocao(quantos_grandes, len(portes))
print("encadeado :", porcentagem)                  # esperado: 60.0

# Versao numa linha so. Confira que da o mesmo resultado:
print("uma linha :", taxa_de_adocao(contar_grandes(portes), len(portes)))
