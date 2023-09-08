export const stages = [
    'opportunity',
    'proposal-sent',
    'in-negotiation',
    'won',
    'lost',
    'delayed',
];

export const stageNames = {
    opportunity: 'Opportunity',
    'proposal-sent': 'Proposal Sent',
    'in-negotiation': 'In Negotiation',
    won: 'Won',
    lost: 'Lost',
    delayed: 'Delayed',
};

export const stageChoices = stages.map(type => ({
    id: type,
    /* @ts-ignore */
    name: stageNames[type],
}));
