import { Dispatch, SetStateAction, useState } from "react";
import { Action, QueueByStatusWithExecutedHistory } from "../types/types";
import { ActionName } from "../types/enums";
import {
  useUpToDateActionsAndQueue,
  useAddActionToQueue,
  useQuotaRefreshAlert,
} from "../hooks";
import { useRefreshInterval } from "../hooks/useRefreshInterval";
import { UPDATED_ACTIONS_AND_QUEUE_INTERVAL } from "../config";

interface Props {
  setQueue: Dispatch<
    SetStateAction<QueueByStatusWithExecutedHistory | undefined>
  >;
  actions: Action[] | undefined;
  setActions: Dispatch<SetStateAction<Action[] | undefined>>;
}

export function ActionsAvailable({ setQueue, actions, setActions }: Props) {
  const [newAction, setNewAction] = useState<ActionName>();
  const [id, setId] = useState<string>("");

  useUpToDateActionsAndQueue(setActions, setQueue, setId);
  const hasRefreshedCredits = useQuotaRefreshAlert(id);

  const refreshInterval = useRefreshInterval();
  useAddActionToQueue(newAction, setNewAction, setQueue);

  const hasActions = actions && actions.length > 0;
  if (!hasActions)
    return <h1>Impossible de charger les actions depuis le serveur</h1>;

  return (
    <section>
      <h3>Actions Possible</h3>
      <div className="actions-config">
        <table className="actions-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Credits restants</th>
            </tr>
          </thead>
          <tbody>
            {hasActions &&
              actions.map(({ name, credits }) => (
                <ActionItem
                  key={name}
                  name={name}
                  credits={credits}
                  newAction={newAction}
                  setNewAction={setNewAction}
                />
              ))}
          </tbody>
        </table>
        <div>
          <p>
            {" "}
            Une requête pour récupérer les actions avec les crédits mis à jour
            et la queue est effectué toutes les{" "}
            {convertMsToString(UPDATED_ACTIONS_AND_QUEUE_INTERVAL)}
          </p>
          {refreshInterval.execution && (
            <p>
              Une action est exécutée toutes les{" "}
              {convertMsToString(refreshInterval.execution)}
            </p>
          )}
          {refreshInterval.credits && (
            <p>
              Le quota des crédits est actualisé toutes les{" "}
              {convertMsToString(refreshInterval.credits)}, si au moins 1 crédit
              a été utilisé
            </p>
          )}
          {hasRefreshedCredits && (
            <p className="credits-refresh">
              Le quota des crédits a été actualisé
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

interface ActionItemProps extends Action {
  newAction: ActionName | undefined;
  setNewAction: Dispatch<React.SetStateAction<ActionName | undefined>>;
}

function ActionItem({
  name,
  credits,
  newAction,
  setNewAction,
}: ActionItemProps) {
  const handleClick = () => {
    setNewAction(name);
  };
  return (
    <tr>
      <td>{name}</td>
      <td>{credits}</td>
      <td>
        <button
          className="add-button"
          onClick={handleClick}
          disabled={newAction !== undefined}
        >
          Ajouter
        </button>
      </td>
    </tr>
  );
}

function convertMsToString(ms: number) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  let formattedString = "";

  if (days > 0) {
    formattedString += `${days}j`;
  }
  if (hours > 0) {
    formattedString += `${hours}h`;
  }
  if (minutes > 0) {
    formattedString += `${minutes}m`;
  }
  if (seconds > 0) {
    formattedString += `${seconds}s`;
  }

  return formattedString !== "" ? formattedString : "0s";
}
