const BASE_URL = 'https://apiv3.apifootball.com';
const API_KEY = '47746f324863a1c7321a4b137847eba9e647469c8eacced9ca6175bbbadf5c2d';

// League ID mappings for major leagues
const LEAGUE_IDS = {
  'Premier League': '152',
  'English Premier League': '152',
  'La Liga': '302',
  'Spanish La Liga': '302',
  'Bundesliga': '175',
  'German Bundesliga': '175',
  'Serie A': '207',
  'Italian Serie A': '207',
  'Ligue 1': '168',
  'French Ligue 1': '168',
  'Süper Lig': '322',
  'Turkish Super League': '322',
  'Super Lig': '322'
};

// Country flag mapping function
export const getCountryFlag = (countryName: string): string => {
  const flagMap: { [key: string]: string } = {
    'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    'Spain': '🇪🇸',
    'Germany': '🇩🇪',
    'Italy': '🇮🇹',
    'France': '🇫🇷',
    'Turkey': '🇹🇷',
    'Portugal': '🇵🇹',
    'Netherlands': '🇳🇱',
    'Belgium': '🇧🇪',
    'Brazil': '🇧🇷',
    'Argentina': '🇦🇷',
    'Mexico': '🇲🇽',
    'United States': '🇺🇸',
    'Canada': '🇨🇦',
    'Russia': '🇷🇺',
    'Poland': '🇵🇱',
    'Czech Republic': '🇨🇿',
    'Austria': '🇦🇹',
    'Switzerland': '🇨🇭',
    'Sweden': '🇸🇪',
    'Norway': '🇳🇴',
    'Denmark': '🇩🇰',
    'Finland': '🇫🇮',
    'Greece': '🇬🇷',
    'Croatia': '🇭🇷',
    'Serbia': '🇷🇸',
    'Ukraine': '🇺🇦',
    'Romania': '🇷🇴',
    'Bulgaria': '🇧🇬',
    'Hungary': '🇭🇺',
    'Slovakia': '🇸🇰',
    'Slovenia': '🇸🇮',
    'Bosnia and Herzegovina': '🇧🇦',
    'Montenegro': '🇲🇪',
    'North Macedonia': '🇲🇰',
    'Albania': '🇦🇱',
    'Moldova': '🇲🇩',
    'Lithuania': '🇱🇹',
    'Latvia': '🇱🇻',
    'Estonia': '🇪🇪',
    'Belarus': '🇧🇾',
    'Georgia': '🇬🇪',
    'Armenia': '🇦🇲',
    'Azerbaijan': '🇦🇿',
    'Kazakhstan': '🇰🇿',
    'Uzbekistan': '🇺🇿',
    'Japan': '🇯🇵',
    'South Korea': '🇰🇷',
    'China': '🇨🇳',
    'Australia': '🇦🇺',
    'New Zealand': '🇳🇿',
    'India': '🇮🇳',
    'Thailand': '🇹🇭',
    'Vietnam': '🇻🇳',
    'Indonesia': '🇮🇩',
    'Malaysia': '🇲🇾',
    'Singapore': '🇸🇬',
    'Philippines': '🇵🇭',
    'South Africa': '🇿🇦',
    'Nigeria': '🇳🇬',
    'Ghana': '🇬🇭',
    'Kenya': '🇰🇪',
    'Morocco': '🇲🇦',
    'Egypt': '🇪🇬',
    'Tunisia': '🇹🇳',
    'Algeria': '🇩🇿',
    'Senegal': '🇸🇳',
    'Cameroon': '🇨🇲',
    'Ivory Coast': '🇨🇮',
    'Mali': '🇲🇱',
    'Burkina Faso': '🇧🇫',
    'Guinea': '🇬🇳',
    'Benin': '🇧🇯',
    'Togo': '🇹🇬',
    'Niger': '🇳🇪',
    'Chad': '🇹🇩',
    'Central African Republic': '🇨🇫',
    'Democratic Republic of the Congo': '🇨🇩',
    'Republic of the Congo': '🇨🇬',
    'Gabon': '🇬🇦',
    'Equatorial Guinea': '🇬🇶',
    'São Tomé and Príncipe': '🇸🇹',
    'Cape Verde': '🇨🇻',
    'Gambia': '🇬🇲',
    'Guinea-Bissau': '🇬🇼',
    'Liberia': '🇱🇷',
    'Sierra Leone': '🇸🇱',
    'Mauritania': '🇲🇷',
    'Western Sahara': '🇪🇭',
    'Libya': '🇱🇾',
    'Sudan': '🇸🇩',
    'South Sudan': '🇸🇸',
    'Ethiopia': '🇪🇹',
    'Eritrea': '🇪🇷',
    'Djibouti': '🇩🇯',
    'Somalia': '🇸🇴',
    'Uganda': '🇺🇬',
    'Rwanda': '🇷🇼',
    'Burundi': '🇧🇮',
    'Tanzania': '🇹🇿',
    'Malawi': '🇲🇼',
    'Zambia': '🇿🇲',
    'Zimbabwe': '🇿🇼',
    'Botswana': '🇧🇼',
    'Namibia': '🇳🇦',
    'Lesotho': '🇱🇸',
    'Eswatini': '🇸🇿',
    'Madagascar': '🇲🇬',
    'Mauritius': '🇲🇺',
    'Seychelles': '🇸🇨',
    'Comoros': '🇰🇲'
  };
  
  // Return flag or default world emoji
  return flagMap[countryName] || '🌍';
};

export const FootballApi = {
  async getLiveMatches(league: string = 'all', date: string = new Date().toISOString().split('T')[0]): Promise<any[]> {
    try {
      console.log(`🔥 Fetching ALL matches for ${league} on ${date}`);
      
      // Tüm maçları getir, sonra filtrele
      const url = `${BASE_URL}/?action=get_events&from=${date}&to=${date}&APIkey=${API_KEY}`;
      console.log('🌍 API Request URL:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📥 Raw API Response:', data.length, 'total matches');
      
      if (!Array.isArray(data)) {
        console.error('❌ API did not return an array:', data);
        return this.getFallbackMatches();
      }
      
      // Önce canlı maçları filtrele
      const liveMatches = data.filter(match => match.match_live === '1');
      console.log('🔴 Live matches found:', liveMatches.length);
      
      // Canlı maç varsa onları göster
      if (liveMatches.length > 0) {
        return this.transformMatches(liveMatches);
      }
      
      // Canlı maç yoksa bugünün son maçlarını göster
      const recentMatches = data
        .filter(match => match.match_status === 'Finished')
        .slice(-8); // Son 8 maç
      
      if (recentMatches.length > 0) {
        console.log('📊 Recent finished matches:', recentMatches.length);
        return this.transformMatches(recentMatches);
      }
      
      // Hiç maç yoksa fallback
      return this.getFallbackMatches();
      
    } catch (error) {
      console.error('❌ Error fetching matches:', error);
      return this.getFallbackMatches();
    }
  },
  
  transformMatches(matches: any[]): any[] {
    return matches.map((match: any) => {
      const isLive = match.match_live === '1';
      const isFinished = match.match_status === 'Finished';
      const matchTime = match.match_time || '0';
      
      return {
        id: match.match_id || 'unknown',
        league: match.league_name || 'Unknown League',
        country: match.country_name || 'Unknown',
        // STATUS - DÜZELTME
        status: isLive ? 'live' : (isFinished ? 'finished' : 'upcoming'),
        // MINUTE - DÜZELTME
        minute: isLive ? matchTime : (isFinished ? '90' : '0'),
        // TIME - DÜZELTME
        time: isLive ? `${matchTime}'` : (isFinished ? 'FT' : match.match_time || '00:00'),
        venue: match.match_stadium,
        referee: match.match_referee,
        round: match.match_round,
        homeTeam: {
          name: String(match.match_hometeam_name || 'Home Team'),
          logo: match.team_home_badge?.replace(/`/g, '') || '/placeholder-logo.svg'
        },
        awayTeam: {
          name: String(match.match_awayteam_name || 'Away Team'),
          logo: match.team_away_badge?.replace(/`/g, '') || '/placeholder-logo.svg'
        },
        homeScore: match.match_hometeam_score !== '' ? parseInt(match.match_hometeam_score) : 0,
        awayScore: match.match_awayteam_score !== '' ? parseInt(match.match_awayteam_score) : 0,
        isLive: isLive,
        goalscorers: match.goalscorer || [],
        cards: match.cards || [],
        substitutions: match.substitutions || {}
      };
    });
  },
  
  getFallbackMatches(): any[] {
    return [
      {
        id: 'fallback-1',
        league: 'Premier League',
        country: 'England',
        status: 'live',
        minute: '67', // DAKIKA - STRING OLARAK
        time: '67\'', // GÖRÜNÜM
        venue: 'Anfield',
        referee: 'Michael Oliver',
        round: 'Round 15',
        homeTeam: {
          name: 'Liverpool',
          logo: '/placeholder-logo.svg'
        },
        awayTeam: {
          name: 'Arsenal',
          logo: '/placeholder-logo.svg'
        },
        homeScore: 1,
        awayScore: 2,
        isLive: true,
        goalscorers: [
          { time: '23', home_scorer: 'Salah' },
          { time: '45', away_scorer: 'Saka' },
          { time: '67', away_scorer: 'Martinelli' }
        ],
        cards: [
          { time: '34', card: 'yellow_card', home_fault: 'Henderson' },
          { time: '56', card: 'yellow_card', away_fault: 'Partey' }
        ],
        substitutions: {}
      },
      {
        id: 'fallback-2',
        league: 'Premier League',
        country: 'England',
        status: 'live',
        minute: '45', // DAKIKA
        time: '45\'', // GÖRÜNÜM
        venue: 'Etihad Stadium',
        referee: 'Anthony Taylor',
        round: 'Round 15',
        homeTeam: {
          name: 'Manchester City',
          logo: '/placeholder-logo.svg'
        },
        awayTeam: {
          name: 'Chelsea',
          logo: '/placeholder-logo.svg'
        },
        homeScore: 0,
        awayScore: 1,
        isLive: true,
        goalscorers: [
          { time: '23', away_scorer: 'Sterling' }
        ],
        cards: [
          { time: '12', card: 'yellow_card', home_fault: 'Rodri' }
        ],
        substitutions: {}
      },
      {
        id: 'fallback-3',
        league: 'Premier League',
        country: 'England',
        status: 'upcoming',
        minute: '0',
        time: '19:45', // SAAT - BAŞLAMADI
        venue: 'Tottenham Hotspur Stadium',
        referee: 'TBD',
        round: 'Round 15',
        homeTeam: {
          name: 'Tottenham',
          logo: '/placeholder-logo.svg'
        },
        awayTeam: {
          name: 'Manchester United',
          logo: '/placeholder-logo.svg'
        },
        homeScore: 0,
        awayScore: 0,
        isLive: false,
        goalscorers: [],
        cards: [],
        substitutions: {}
      },
      {
        id: 'fallback-4',
        league: 'Premier League',
        country: 'England',
        status: 'finished',
        minute: '90',
        time: 'FT', // FULL TIME - BİTTİ
        venue: 'Old Trafford',
        referee: 'Mike Dean',
        round: 'Round 15',
        homeTeam: {
          name: 'Manchester United',
          logo: '/placeholder-logo.svg'
        },
        awayTeam: {
          name: 'Brighton',
          logo: '/placeholder-logo.svg'
        },
        homeScore: 2,
        awayScore: 1,
        isLive: false,
        goalscorers: [
          { time: '15', home_scorer: 'Rashford' },
          { time: '34', away_scorer: 'Mitoma' },
          { time: '78', home_scorer: 'Bruno Fernandes' }
        ],
        cards: [],
        substitutions: {}
      }
    ];
  },

  async getAvailableLeagues(): Promise<any[]> {
    try {
      const url = `${BASE_URL}/?action=get_leagues&APIkey=${API_KEY}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Leagues API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching available leagues:', error);
      return [];
    }
  }
};
