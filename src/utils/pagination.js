
export function getPaginationParams(req, defaultLimit = 10, maxLimit = 100) {
  // lire page et limit depuis la query (sinon valeurs par défaut)
  let page = parseInt(req.query.page, 10) || 1;
  let limit = parseInt(req.query.limit, 10) || defaultLimit;

  // éviter les valeurs négatives ou égales à 0
  if (page < 1) page = 1;
  if (limit < 1) limit = defaultLimit;

  // empêcher une limite trop grande
  if (limit > maxLimit) limit = maxLimit;

  // nombre d’éléments à sauter avant de commencer
  const offset = (page - 1) * limit;

  // retourner les paramètres utilisables dans la requête SQL
  return { page, limit, offset };
}
