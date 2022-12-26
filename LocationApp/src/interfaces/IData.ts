export default interface IData {
  hora: string;
  location: {
    latitude: string;
    longitude: string;
  };
  clima: {
    temperatura: string;
    umidade: string;
  };
}
