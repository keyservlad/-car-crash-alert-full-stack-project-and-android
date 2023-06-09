export type Environment = 'development' | 'staging' | 'production';

const pe = process.env;

export const PORT = pe.PORT || 3001;

export const ENVIRONMENT = (pe.ENVIRONMENT as Environment) || 'production';