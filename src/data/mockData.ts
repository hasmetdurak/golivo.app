export const mockMatches = [
  {
    id: '1',
    league: 'Premier League',
    status: 'live',
    minute: '67',
    homeTeam: {
      name: 'Manchester City',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-City-Logo.png'
    },
    awayTeam: {
      name: 'Liverpool',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Liverpool-Logo.png'
    },
    homeScore: 2,
    awayScore: 1,
    events: [
      { type: 'Goal', minute: '23', player: 'Haaland' },
      { type: 'Goal', minute: '45', player: 'Salah' },
      { type: 'Goal', minute: '62', player: 'De Bruyne' }
    ]
  },
  {
    id: '2', 
    league: 'La Liga',
    status: 'live',
    minute: '34',
    homeTeam: {
      name: 'Barcelona',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Barcelona-Logo.png'
    },
    awayTeam: {
      name: 'Real Madrid',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png'
    },
    homeScore: 1,
    awayScore: 0,
    events: [
      { type: 'Goal', minute: '28', player: 'Lewandowski' }
    ]
  },
  {
    id: '3',
    league: 'Super Lig',
    status: 'finished',
    minute: '90',
    homeTeam: {
      name: 'Galatasaray',
      logo: 'https://logoeps.com/wp-content/uploads/2013/03/galatasaray-vector-logo.png'
    },
    awayTeam: {
      name: 'Fenerbahçe',
      logo: 'https://logoeps.com/wp-content/uploads/2013/03/fenerbahce-vector-logo.png'
    },
    homeScore: 3,
    awayScore: 2,
    events: [
      { type: 'Goal', minute: '12', player: 'Icardi' },
      { type: 'Goal', minute: '34', player: 'Dzeko' },
      { type: 'Goal', minute: '56', player: 'Kerem' },
      { type: 'Goal', minute: '78', player: 'Tadic' },
      { type: 'Goal', minute: '89', player: 'Mertens' }
    ]
  },
  {
    id: '4',
    league: 'Bundesliga',
    status: 'live',
    minute: '12',
    homeTeam: {
      name: 'Bayern München',
      logo: 'https://logoeps.com/wp-content/uploads/2013/03/bayern-munchen-vector-logo.png'
    },
    awayTeam: {
      name: 'Borussia Dortmund',
      logo: 'https://logoeps.com/wp-content/uploads/2013/03/borussia-dortmund-vector-logo.png'
    },
    homeScore: 0,
    awayScore: 0,
    events: []
  }
];

export const topScorers = [
  { name: 'Erling Haaland', team: 'Manchester City', goals: 23 },
  { name: 'Kylian Mbappé', team: 'PSG', goals: 21 },
  { name: 'Robert Lewandowski', team: 'Barcelona', goals: 19 },
  { name: 'Victor Osimhen', team: 'Napoli', goals: 18 },
  { name: 'Harry Kane', team: 'Bayern München', goals: 17 },
  { name: 'Mauro Icardi', team: 'Galatasaray', goals: 15 }
];