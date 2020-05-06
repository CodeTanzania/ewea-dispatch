const dispatches = [
  {
    _id: '5eb20aaadcf2bd6aae15b4d0',
    number: '2020-000022-TZ',
    requester: {
      name: 'Shida Mdoe',
      mobile: '255714151596',
      location: {
        type: 'Point',
        coordinates: [39.246591788727606, -6.8518629894744665],
      },
      address: 'Tandale',
    },
    victim: {
      referral: '85623679',
      name: 'Jane Mode',
      mobile: '255714117841',
      age: 30,
      weight: 51,
      address: 'Tandale',
    },
    description: 'Severe fracture from motorcycle accident.',
    pickup: {
      location: {
        type: 'Point',
        coordinates: [39.24103404295356, -6.862313753910058],
      },
      address: 'Tandale',
      arrivedAt: '2020-05-04T02:54:48.323Z',
      dispatchedAt: '2020-05-04T02:56:48.323Z',
      remarks: 'Handled.',
    },
    dropoff: {
      location: {
        type: 'Point',
        coordinates: [39.22890946336606, -6.79835210100642],
      },
      address: 'Amana Hospital',
      arrivedAt: '2020-05-04T02:58:48.323Z',
      dispatchedAt: '2020-05-04T02:59:48.323Z',
      remarks: 'Aut iure ea velit et pariatur.',
    },
    reportedAt: '2020-05-04T02:48:48.323Z',
    dispatchedAt: '2020-05-04T02:50:48.323Z',
    resolvedAt: '2020-05-04T02:59:58.323Z',
    remarks: 'Handled.',

    populate: {
      group: {
        match: { 'strings.name.en': 'Hydrological' },
        model: 'Predefine',
      },
      type: {
        match: { namespace: 'EventType', 'strings.name.en': 'Floods' },
        model: 'Predefine',
      },
      status: {
        match: { namespace: 'VehicleStatus', 'strings.name.en': 'Operational' },
        model: 'Predefine',
      },
      'pickup.area': {
        match: { namespace: 'AdministrativeArea', 'strings.name.en': 'Ilala' },
        model: 'Predefine',
        array: true,
      },
      'dropoff.area': {
        match: { namespace: 'AdministrativeArea', 'strings.name.en': 'Ilala' },
        model: 'Predefine',
        array: true,
      },
      'carrier.type': {
        match: { namespace: 'VehicleType', 'strings.name.en': 'Ambulance' },
        model: 'Predefine',
      },
      'carrier.owner': {
        match: {
          name: {
            $in: ['Dar es Salaam Multi-Agency Emergency Response Team'],
          },
        },
        model: 'Party',
        array: true,
      },
      'carrier.vehicle': {
        match: { namespace: 'Vehicle', 'strings.name.en': 'T 123 ABC' },
        model: 'Predefine',
      },
      crew: {
        match: { name: { $in: ['Lally Elias', 'Benson Maruchu'] } },
        model: 'Party',
        array: true,
      },
    },
  },
];

export default dispatches;
