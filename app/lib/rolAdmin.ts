export function esAdmin(publicMetadata: Record<string, unknown>): boolean {
  const rolesAdmin = (publicMetadata?.rolesAdmin as string[] || []);
  return rolesAdmin.some(rol => typeof rol === 'string' && rol.includes('admin'));
}
