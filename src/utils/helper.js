export const options = {
  chart: {
    id: 'realtime',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 800,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#333'],
      },
      offsetX: 30,
    },
    tooltip: {
      enabled: true,
      shared: true,
      followCursor: true,
      marker: {
        show: true,
      },
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: '',
      align: 'left',
    },
    toolbar: {
      show: true,
      tools: {
        selection: false,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
      onDatasetHover: {
        highlightDataSeries: true,
      },
    },
    zoom: {
      enabled: true,
    },
  },
};
