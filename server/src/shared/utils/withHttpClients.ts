function validateDomain(clientsList: string[], clientName: string): void {
  if (!clientsList.includes(clientName)) {
    throw new Error(
      `Can't find client name ${clientName} among available clients`
    );
  }
}

export function withHttpClients(clientName: string, getState) {
  validateDomain(Object.keys(getState().httpClients), clientName);

  return getState().httpClients[clientName];
}
