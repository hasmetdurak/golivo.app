import React from 'react';
import { render, screen } from '@testing-library/react';
import { MatchCard } from './MatchCard';

// Mock data for testing
const mockLiveMatch = {
  status: 'live',
  minute: 75,
  homeScore: 2,
  awayScore: 1,
  homeTeam: { name: 'Galatasaray', logo: 'https://example.com/gs.png' },
  awayTeam: { name: 'Fenerbahçe', logo: 'https://example.com/fb.png' }
};

const mockFinishedMatch = {
  status: 'finished',
  homeScore: 3,
  awayScore: 2,
  homeTeam: { name: 'Beşiktaş', logo: 'https://example.com/bjk.png' },
  awayTeam: { name: 'Trabzonspor', logo: 'https://example.com/ts.png' }
};

describe('MatchCard', () => {
  test('renders minute information for live matches below the score', () => {
    render(<MatchCard match={mockLiveMatch} />);
    
    // Check if minute is displayed
    expect(screen.getByText("75'")).toBeInTheDocument();
    
    // Check if minute is displayed below the score (in the same container)
    const scoreContainer = screen.getByText('2').parentElement?.parentElement;
    expect(scoreContainer).toContainElement(screen.getByText("75'"));
  });

  test('does not render minute information for finished matches', () => {
    render(<MatchCard match={mockFinishedMatch} />);
    
    // Check that minute is not displayed for finished matches
    expect(screen.queryByText(/'\d+/)).not.toBeInTheDocument();
  });
});