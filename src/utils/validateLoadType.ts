export function validateLoadType(fullLoad: boolean, complementLoad: boolean) {
  if (fullLoad && complementLoad) {
    return 'full_complement';
  }

  if (fullLoad) {
    return 'full';
  }

  if (complementLoad) {
    return 'complement';
  }
}
