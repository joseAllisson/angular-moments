import { Moment } from "../interfaces/Moment";

export const momentMock: Moment = {
  id: 1,
  title: 'Test Moment 1',
  description: 'Test Description 1',
  image: 'Test Image 1',
  created_at: '2021-01-01T00:00:00.000Z',
  updated_at: '2021-01-01T00:00:00.000Z',
  comments: [{ text: 'Test Comment 1', username: 'Test User 1' }]
}
