import Card from "@/components/Card/Card";
import Button from "@/components/Button/Button";
import styles from "@/styles/globals.css"; // we’ll use the class defined there

export default function Home() {
  return (
    <div className="appContainer">
      <Card>
        <Button>Items</Button>
        <Button>➕</Button>
        <Button>🚀</Button>
      </Card>
    </div>
  );
}
