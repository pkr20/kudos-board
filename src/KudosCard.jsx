export default function KudosCard({ title, description, upvotes }) {
    return (
        <div className="kudos-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="kudos-card-bottom">
                <span className="upvotes">👥 {upvotes} Upvotes</span>
                <button className="view-button">View Board</button>
            </div>
        </div>
    );
} 