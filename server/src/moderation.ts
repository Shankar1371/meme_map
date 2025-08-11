export async function nsfwCheck(_image: Buffer): Promise<'clean' | 'nsfw'> {
  // TODO: integrate real NSFW detection
  return 'clean';
}

export async function toxicityCheck(_text: string): Promise<'clean' | 'toxic'> {
  // TODO: integrate real toxicity detection
  return 'clean';
}
