export function renderLoadTypes(loadType: string) {
  switch (loadType) {
    case 'full':
      return <span>Carga Completa</span>;
    case 'complement':
      return <span>Complemento</span>;
    case 'full_complement':
      return (
        <>
          <span>Carga Completa</span>
          <span>Complemento</span>
        </>
      );
    default:
      return '';
  }
}
