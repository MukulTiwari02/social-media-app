import Layout from "@/components/Layout";
import Card from "@/components/Card";
import Notification from "@/components/Notification";

const NotificationsPage = () => {
  return (
    <Layout>
      <h1 className="text-4xl md:text-6xl mb-4 text-gray-300">Your Notifications</h1>
      <Card noPadding={true }>
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </Card>
    </Layout>
  );
};

export default NotificationsPage;
