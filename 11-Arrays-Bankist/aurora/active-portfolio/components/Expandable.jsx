import {
  ExpandableColumn,
  ExpandableContainer,
  ExpandableGrid,
  ExpandableRequest,
  ExpandableRow,
  ExpandableValue,
} from "../../../../../styles/DataTables";

export const Expandable = ({ data }) => {
  return (
    <ExpandableContainer>
      <ExpandableGrid>
        <ExpandableRow>
          <ExpandableColumn>
            <ExpandableRequest>
              <p>Tasa de Interés</p>
              <ExpandableValue>
                <span>{`${data?.interestRate || ""}`}</span>
              </ExpandableValue>
            </ExpandableRequest>
          </ExpandableColumn>
        </ExpandableRow>

        <ExpandableRow>
          <ExpandableColumn>
            <ExpandableRequest>
              <p>Interés por Cobrar</p>
              <ExpandableValue>
                <span>{data?.interestReceivable}</span>
              </ExpandableValue>
            </ExpandableRequest>
          </ExpandableColumn>
        </ExpandableRow>

        <ExpandableRow>
          <ExpandableColumn>
            <ExpandableRequest>
              <p>Interés Suspendido</p>
              <ExpandableValue>
                <span>{data?.suspendedInterest}</span>
              </ExpandableValue>
            </ExpandableRequest>
          </ExpandableColumn>
        </ExpandableRow>

        <ExpandableRow>
          <ExpandableColumn>
            <ExpandableRequest>
              <p>Interés Capitalizable</p>
              <ExpandableValue>
                <span>{`${data?.capitalizableInterest || ""}`}</span>
              </ExpandableValue>
            </ExpandableRequest>
          </ExpandableColumn>
        </ExpandableRow>

        <ExpandableRow>
          <ExpandableColumn>
            <ExpandableRequest>
              <p>Interés Administrativo</p>
              <ExpandableValue>
                <span>{data?.adminInterests}</span>
              </ExpandableValue>
            </ExpandableRequest>
          </ExpandableColumn>
        </ExpandableRow>

        <ExpandableRow>
          <ExpandableColumn>
            <ExpandableRequest>
              <p>Último Interés Calculado</p>
              <ExpandableValue>
                <span>{data?.lastCalcInterests || ""}</span>
              </ExpandableValue>
            </ExpandableRequest>
          </ExpandableColumn>
        </ExpandableRow>

        <ExpandableRow>
          <ExpandableColumn>
            <ExpandableRequest>
              <p>Último Interés Pagado</p>
              <ExpandableValue>
                <span>{data?.lastPaidInterests}</span>
              </ExpandableValue>
            </ExpandableRequest>
          </ExpandableColumn>
        </ExpandableRow>

        <ExpandableRow>
          <ExpandableColumn>
            <ExpandableRequest>
              <p>Tasa de Interés</p>
              <ExpandableValue>
                <span>{data?.interestRate}</span>
              </ExpandableValue>
            </ExpandableRequest>
          </ExpandableColumn>
        </ExpandableRow>

        <ExpandableRow>
          <ExpandableColumn>
            <ExpandableRequest>
              <p>Tasa Flotante</p>
              <ExpandableValue>
                <span>{data?.floatingRate}</span>
              </ExpandableValue>
            </ExpandableRequest>
          </ExpandableColumn>
        </ExpandableRow>

        <ExpandableRow>
          <ExpandableColumn>
            <ExpandableRequest>
              <p>Última Tasa</p>
              <ExpandableValue>
                <span>{`${data?.lastRate || ""}`}</span>
              </ExpandableValue>
            </ExpandableRequest>
          </ExpandableColumn>
        </ExpandableRow>

        <ExpandableRow>
          <ExpandableColumn>
            <ExpandableRequest>
              <p>Memo Principal</p>
              <ExpandableValue>
                <span>{data?.principalMemo}</span>
              </ExpandableValue>
            </ExpandableRequest>
          </ExpandableColumn>
        </ExpandableRow>

        <ExpandableRow>
          <ExpandableColumn>
            <ExpandableRequest>
              <p>Interés de Mora</p>
              <ExpandableValue>
                <span>{data?.lateInterest}</span>
              </ExpandableValue>
            </ExpandableRequest>
          </ExpandableColumn>
        </ExpandableRow>

        <ExpandableRow>
          <ExpandableColumn>
            <ExpandableRequest>
              <p>Monto de Obligaciones del Cliente</p>
              <ExpandableValue>
                <span>{`${data?.customerObligationsAmmount || ""}`}</span>
              </ExpandableValue>
            </ExpandableRequest>
          </ExpandableColumn>
        </ExpandableRow>
      </ExpandableGrid>
    </ExpandableContainer>
  );
};
