import { Line } from 'react-chartjs-2';
import { useEvents } from '../../context/EventContext';

interface EventSalesChartProps {
  eventId: string | null;
}

export default function EventSalesChart({ eventId }: EventSalesChartProps) {
  const { events } = useEvents();
  
  // Mock data - in a real app, this would come from your backend
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Ticket Sales',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Ticket Sales Over Time',
      },
    },
  };

  return (
    <div className="h-64">
      <Line data={data} options={options} />
    </div>
  );
}