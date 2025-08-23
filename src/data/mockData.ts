export const mockMatches = [
  {
    id: '1',
    league: 'Premier League',
    country: 'England',
    status: 'live',
    minute: '67',
    time: '15:00',
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
    league: 'Premier League',
    country: 'England',
    status: 'live',
    minute: '34',
    time: '17:30',
    homeTeam: {
      name: 'Arsenal',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Arsenal-Logo.png'
    },
    awayTeam: {
      name: 'Chelsea',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Chelsea-Logo.png'
    },
    homeScore: 1,
    awayScore: 0,
    events: [
      { type: 'Goal', minute: '28', player: 'Saka' }
    ]
  },
  {
    id: '3',
    league: 'La Liga',
    country: 'Spain',
    status: 'finished',
    minute: '90',
    time: '21:00',
    homeTeam: {
      name: 'Barcelona',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Barcelona-Logo.png'
    },
    awayTeam: {
      name: 'Real Madrid',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Real-Madrid-Logo.png'
    },
    homeScore: 2,
    awayScore: 1,
    events: [
      { type: 'Goal', minute: '15', player: 'Lewandowski' },
      { type: 'Goal', minute: '42', player: 'Bellingham' },
      { type: 'Goal', minute: '78', player: 'Gavi' }
    ]
  },
  {
    id: '4',
    league: 'Bundesliga',
    country: 'Germany',
    status: 'live',
    minute: '12',
    time: '18:30',
    homeTeam: {
      name: 'Bayern Munich',
      logo: 'https://logoeps.com/wp-content/uploads/2013/03/bayern-munchen-vector-logo.png'
    },
    awayTeam: {
      name: 'Borussia Dortmund',
      logo: 'https://logoeps.com/wp-content/uploads/2013/03/borussia-dortmund-vector-logo.png'
    },
    homeScore: 0,
    awayScore: 0,
    events: []
  },
  {
    id: '5',
    league: 'Serie A',
    country: 'Italy',
    status: 'finished',
    minute: '90',
    time: '20:45',
    homeTeam: {
      name: 'Juventus',
      logo: 'https://logoeps.com/wp-content/uploads/2013/03/juventus-vector-logo.png'
    },
    awayTeam: {
      name: 'AC Milan',
      logo: 'https://logoeps.com/wp-content/uploads/2013/03/ac-milan-vector-logo.png'
    },
    homeScore: 1,
    awayScore: 2,
    events: [
      { type: 'Goal', minute: '25', player: 'Vlahovic' },
      { type: 'Goal', minute: '58', player: 'Leao' },
      { type: 'Goal', minute: '84', player: 'Giroud' }
    ]
  },
  {
    id: '6',
    league: 'Champions League',
    status: 'scheduled',
    minute: null,
    time: '21:00',
    homeTeam: {
      name: 'Paris Saint-Germain',
      logo: 'https://logoeps.com/wp-content/uploads/2013/03/psg-vector-logo.png'
    },
    awayTeam: {
      name: 'Manchester United',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Manchester-United-Logo.png'
    },
    homeScore: 0,
    awayScore: 0,
    events: []
  },
  {
    id: '7',
    league: 'Ligue 1',
    status: 'finished',
    minute: '90',
    time: '17:00',
    homeTeam: {
      name: 'Olympique Marseille',
      logo: 'https://logoeps.com/wp-content/uploads/2013/03/olympique-marseille-vector-logo.png'
    },
    awayTeam: {
      name: 'AS Monaco',
      logo: 'https://logoeps.com/wp-content/uploads/2013/03/as-monaco-vector-logo.png'
    },
    homeScore: 3,
    awayScore: 1,
    events: [
      { type: 'Goal', minute: '18', player: 'Aubameyang' },
      { type: 'Goal', minute: '35', player: 'Ben Yedder' },
      { type: 'Goal', minute: '67', player: 'Payet' },
      { type: 'Goal', minute: '89', player: 'Harit' }
    ]
  },
  {
    id: '8',
    league: 'Turkish Super League',
    status: 'live',
    minute: '75',
    time: '19:00',
    homeTeam: {
      name: 'Galatasaray',
      logo: 'https://logoeps.com/wp-content/uploads/2013/03/galatasaray-vector-logo.png'
    },
    awayTeam: {
      name: 'Fenerbahce',
      logo: 'https://logoeps.com/wp-content/uploads/2013/03/fenerbahce-vector-logo.png'
    },
    homeScore: 2,
    awayScore: 1,
    events: [
      { type: 'Goal', minute: '22', player: 'Icardi' },
      { type: 'Goal', minute: '48', player: 'Dzeko' },
      { type: 'Goal', minute: '71', player: 'Mertens' }
    ]
  }
];

export const topScorers = [
  { name: 'Erling Haaland', team: 'Manchester City', goals: 24 },
  { name: 'Kylian Mbappé', team: 'Paris Saint-Germain', goals: 22 },
  { name: 'Robert Lewandowski', team: 'Barcelona', goals: 20 },
  { name: 'Victor Osimhen', team: 'Napoli', goals: 19 },
  { name: 'Harry Kane', team: 'Bayern Munich', goals: 18 },
  { name: 'Mohamed Salah', team: 'Liverpool', goals: 16 },
  { name: 'Karim Benzema', team: 'Real Madrid', goals: 15 },
  { name: 'Dusan Vlahovic', team: 'Juventus', goals: 14 }
];