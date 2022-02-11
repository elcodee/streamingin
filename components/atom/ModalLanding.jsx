import { useState } from "react";
import {
  Button,
  Modal,
  Input,
  Checkbox,
  Row,
  Collapse,
  Text,
  Loading,
  Radio,
} from "@nextui-org/react";
import { message, Form } from "antd";
import { useRouter } from "next/router";
import { postOrder } from "../../req/order";

export default function ModalLanding({ price, category, name, desc }) {
  const [visible, setVisible] = useState(false);
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const handleInputs = async (e) => {
    setInputs({
      ...inputs,
      status: "PENDING",
      kode_order: Math.floor(100000 + Math.random() * 900000).toString(),
      product: `${category} ${name}`,
      price: price,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      if (!inputs.nama_pembeli) {
        closeHandler();
        message.error("Nama Tidak Boleh Kosong !", 6);
        setLoading(false);
      }
      if (!inputs.no_whatsapp) {
        closeHandler();
        message.error("No Whatsapp Tidak Boleh Kosong !", 6);
        setLoading(false);
      }
      if (!inputs.payment) {
        closeHandler();
        message.error("Payment Tidak Boleh Kosong !", 6);
        setLoading(false);
      }
      if (!inputs.price) {
        closeHandler();
        message.error("Harga Tidak Valid !", 6);
        setLoading(false);
      }
      if (!inputs.product) {
        closeHandler();
        message.error("Produk Tidak Valid !", 6);
        setLoading(false);
      }
    }, 1500);

    if (
      inputs.nama_pembeli &&
      inputs.no_whatsapp &&
      inputs.payment &&
      inputs.price &&
      inputs.product
    ) {
      const params = {
        kode_order: `#${inputs.kode_order}`,
        nama_pembeli: inputs.nama_pembeli,
        no_whatsapp: inputs.no_whatsapp,
        payment: inputs.payment,
        price: inputs.price.toString(),
        product: inputs.product,
        status: "PENDING",
      };

      const res = await postOrder(params);
      if (res) {
        setTimeout(() => {
          localStorage.setItem("orders", JSON.stringify(inputs));
          setLoading(false);
          router.push("/invoice", undefined, { shallow: true });
        }, 3000);
      }
      // console.log("RES ORDER : ", res);
      // closeHandler();
    }
  };

  return (
    <div>
      <Button
        flat
        auto
        justify="flex-end"
        css={{
          color: "#94f9f0",
          bg: "#94f9f026",
          textAlign: "end",
          marginTop: "0.5em",
        }}
        onClick={handler}
      >
        <Text
          css={{ color: "inherit" }}
          size={13}
          weight="bold"
          transform="uppercase"
        >
          Beli
        </Text>
      </Button>
      <Modal
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        css={{ margin: "0 1em" }}
      >
        <Modal.Header>
          <Text b id="modal-title" size={18}>
            {`${category} ${name}`}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Collapse bordered shadow title="Detail Produk" css={{ mb: "1.5em" }}>
            <Text>
              <li>Rp {parseInt(price).toLocaleString("id")}</li>
              <li>{desc}</li>
            </Text>
          </Collapse>
          <Input
            required
            underlined
            clearable
            bordered
            fullWidth
            onChange={(e) => handleInputs(e)}
            name="nama_pembeli"
            label="Full Name"
            placeholder="Nama Anda"
            color="primary"
            size="lg"
            type="text"
          />
          <Input
            required
            underlined
            clearable
            bordered
            fullWidth
            onChange={(e) => handleInputs(e)}
            name="no_whatsapp"
            label="No Whatsapp"
            placeholder="081xxxx"
            color="primary"
            size="lg"
            type="number"
          />
          <Form.Item
            label="Metode Pembayaran"
            style={{ marginBottom: "-1em", fontColor: "blue" }}
          />
          <Radio.Group>
            <Radio
              value="BCA"
              name="payment"
              size="xs"
              onInput={(e) => handleInputs(e)}
              squared
            >
              BCA
            </Radio>
            <Radio
              value="OVO"
              name="payment"
              size="xs"
              onInput={(e) => handleInputs(e)}
              squared
            >
              GOPAY
            </Radio>
            <Radio
              value="GOPAY"
              name="payment"
              size="xs"
              onInput={(e) => handleInputs(e)}
              squared
            >
              OVO
            </Radio>
            <Radio
              value="DANA"
              name="payment"
              size="xs"
              onInput={(e) => handleInputs(e)}
              squared
            >
              DANA
            </Radio>
          </Radio.Group>
          {/* <Row justify="space-between">
            <Checkbox required>
              <Text size={14}>Setuju Syarat & Ketentuan </Text>
            </Checkbox>
          </Row> */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            auto
            flat
            color="white"
            disabled={loading}
            onClick={closeHandler}
          >
            Tutup
          </Button>
          <Button auto onClick={handleSubmit} clickable={!loading}>
            {loading ? (
              <Loading color="white" type="points" size="md" />
            ) : (
              `Bayar`
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
