import ethConnect from 'meteor/populous:eth-connect';

const {
  config: {
    network: { ropsten },
  },
  methods: { connect},
} = ethConnect;

const connectInstance = connect(ropsten);

console.log("here bro")
export default connectInstance;