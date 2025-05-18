function extractPathnameSegments(path) {
  const splitUrl = path.split('/');

  return {
    resource: splitUrl[1] || null,
    id: splitUrl[2] || null,
    originalPath: path, // Tambahkan properti originalPath
  };
}

function constructRouteFromSegments(pathSegments) {
  let pathname = '';

  if (pathSegments.resource) {
    pathname = pathname.concat(`/${pathSegments.resource}`);
  }

  if (pathSegments.id) {
    pathname = pathname.concat('/:id');
  }

  return pathname || '/';
}

export function getActivePathname() {
  return location.hash.replace('#', '') || '/';
}

export function getActiveRoute(routes) {
  // Tambahkan parameter routes
  const pathname = getActivePathname();
  const urlSegments = extractPathnameSegments(pathname);
  const constructedRoute = constructRouteFromSegments(urlSegments);

  // Cek apakah route yang dibangun ada di routes
  if (routes && !routes[constructedRoute]) {
    return {
      route: '/404', // Kembalikan route 404 khusus
      segments: urlSegments,
    };
  }

  return {
    route: constructedRoute,
    segments: urlSegments,
  };
}

export function parseActivePathname() {
  const pathname = getActivePathname();
  return extractPathnameSegments(pathname);
}

export function getRoute(pathname, routes) {
  // Tambahkan parameter routes
  const urlSegments = extractPathnameSegments(pathname);
  const constructedRoute = constructRouteFromSegments(urlSegments);

  // Cek apakah route yang dibangun ada di routes
  if (routes && !routes[constructedRoute]) {
    return {
      route: '/404', // Kembalikan route 404 khusus
      segments: urlSegments,
    };
  }

  return {
    route: constructedRoute,
    segments: urlSegments,
  };
}

export function parsePathname(pathname) {
  return extractPathnameSegments(pathname);
}
