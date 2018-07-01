import Show from './model'

let show

beforeEach(async () => {
  show = await Show.query().insert({
    id: 4,
    name: 'Mad Men',
    channel: 'AMC',
    genre: 'Drama',
    rating: 3,
    explicit: false
  })
})

afterEach(async () => {
  await show.$query().delete()
})

describe('/shows model', () => {
  it('has a summary', () => {
    const expectedSummary = 'Mad Men - Drama - 3'
    expect(show.summary()).toBe(expectedSummary)
  })
})
