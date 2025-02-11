import * as React from "react";
import { Badge } from "./Badge";

export interface BadgeListProps {
    onBadgeClick: (badge: pxt.auth.Badge) => void;
    availableBadges: pxt.auth.Badge[];
    userState: pxt.auth.UserBadgeState;
}

export const BadgeList = (props: BadgeListProps) => {
    const { onBadgeClick, availableBadges, userState } = props;

    const badges = availableBadges.slice();

    let unlocked: pxt.Map<boolean> = {};

    for (const badge of userState.badges) {
        unlocked[badge.id] = true;
        if (!badges.some(b => b.id === badge.id)) {
            badges.push(badge);
        }
    }

    const bg: JSX.Element[] = []
    for (let i = 0; i < Math.max(badges.length + 10, 20); i++) {
        bg.push(<div key={i} className="placeholder-badge" />)
    }

    return <div className="profile-badge-list">
        <div className="profile-badge-heder">
            <span className="profile-badge-title">
                {lf("Badges")}
            </span>

            <span className="profile-badge-subtitle">
                {lf("Click each badge to see details")}
            </span>
        </div>
        <div className="profile-badges-scroller">
            <div className="profile-badges">
                <div className="profile-badges-background-container">
                    <div className="profile-badges-background">
                        { bg }
                    </div>
                </div>
                { badges.map(badge =>
                    <div className="profile-badge-and-title">
                        <Badge key={badge.id}
                            onClick={onBadgeClick}
                            badge={badge}
                            disabled={!unlocked[badge.id]}
                        />
                        <div className="profile-badge-title">
                            {badge.title}
                        </div>
                    </div>
                ) }
            </div>
        </div>
    </div>
}