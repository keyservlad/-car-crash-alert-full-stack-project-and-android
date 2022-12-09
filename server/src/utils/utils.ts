export const makeReference = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  export const convertNodeToCursor = (node: any) => {
    return new Buffer(node.id, 'binary').toString('base64');
  };

  export const convertCursorToNodeId = (cursor: string) => {
    return new Buffer(cursor, 'base64').toString('binary');
  };