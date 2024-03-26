import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'
import { BotaoSalvar, Botao } from '../../styles'
import * as enums from '../../uteis/enums/Tarefa'

import { alteraStatus, editar, remover } from '../../store/reducers/tarefa'
import TarefaClass from '../../models/Tarefa'

type Props = TarefaClass

const Tarefa = ({
  descricao: descricaoOriginal,
  status,
  prioridade,
  titulo,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [estaEditando, setEstaEditando] = useState(false)
  const [descricao, setDescricao] = useState('')

  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
  }

  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    dispatch(
      alteraStatus({
        id,
        finalizado: evento.target.checked
      })
    )
  }

  return (
    <div>
      <S.Card>
        <label htmlFor={titulo}>
          <input
            type="checkbox"
            id={titulo}
            checked={status === enums.Status.CONCLUIDA}
            onChange={alteraStatusTarefa}
          />
          <S.Titulo>
            {estaEditando && <em>Editanto:</em>}
            {titulo}
          </S.Titulo>
        </label>
        <S.Tag parametro="prioridade" prioridade={prioridade}>
          {prioridade}
        </S.Tag>
        <S.Tag parametro="status" status={status}>
          {status}
        </S.Tag>
        <S.Descricao
          disabled={!estaEditando}
          value={descricao}
          onChange={(evento) => setDescricao(evento.target.value)}
        />
        <S.BarraDeAcoes>
          {estaEditando ? (
            <>
              <BotaoSalvar
                onClick={() => {
                  dispatch(
                    editar({
                      descricao,
                      status,
                      prioridade,
                      titulo,
                      id
                    }),
                    setEstaEditando(false)
                  )
                }}
              >
                Salvar
              </BotaoSalvar>
              <S.botaoCancelarRemover onClick={cancelarEdicao}>
                Cancelar
              </S.botaoCancelarRemover>
            </>
          ) : (
            <>
              <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
              <S.botaoCancelarRemover onClick={() => dispatch(remover(id))}>
                Remover
              </S.botaoCancelarRemover>
            </>
          )}
        </S.BarraDeAcoes>
      </S.Card>
    </div>
  )
}

export default Tarefa
