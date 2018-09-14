import { StatusCodes } from '../codes/statusCodes';

export type response = [StatusCodes, any];
export type responsePromise = Promise<response>;
