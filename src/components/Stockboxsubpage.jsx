import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "react-apexcharts";
import "../style/stockboxsubpage.css";

function Stockboxsubpage() {
  const { title } = useParams(); // Accessing the dynamic part of the URL
  const [data, setData] = useState(null);
  const [marketSentiment, setMarketSentiment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({ values: [] });
  const [options, setOptions] = useState({
    chart: { id: "stock-chart", toolbar: { show: false } },
    grid: { show: false },
    stroke: { curve: "smooth", width: 2 },
    xaxis: { type: "datetime", labels: { show: true, format: "HH:mm" } },
    yaxis: { show: true },
    dataLabels: { enabled: false },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["rgba(16, 145, 33, 0.3)"],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    colors: ["rgb(16, 145, 33)"],
    tooltip: {
      x: { format: "HH:mm" },
      y: { formatter: (value) => value.toFixed(2) },
      theme: "dark",
    },
  });

  useEffect(() => {
    fetchData(title);
  }, [title]);

  const fetchData = async (title) => {
    const apiUrls = {
      "NIFTY 50":
        "https://devapi.marketstatus.in/sm/indicesApiHandler.php?indices=nifty50",
      NIFTYBANK:
        "https://devapi.marketstatus.in/sm/indicesApiHandler.php?indices=niftyBank",
      SENSEX:
        "https://devapi.marketstatus.in/sm/indicesApiHandler.php?indices=sensex",
    };

    const dataKeys = {
      "NIFTY 50": "today_stock_data",
      NIFTYBANK: "today_stock_data_bn",
      SENSEX: "today_stocks_sx_data",
    };

    setLoading(true);
    try {
      const response = await fetch(apiUrls[title]);
      const result = await response.json();

      const stockData = result.data[dataKeys[title]];
      setData(stockData);
      setMarketSentiment(result.data);
      setLoading(false);
      updateChart(stockData, result.data);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const updateChart = (data, marketSentiment) => {
    if (!data || data.length === 0 || !marketSentiment) return;

    const values = data.map((item) => ({
      x: new Date(item.time * 1000).toISOString(),
      y: item.value,
    }));

    setChartData({ values });

    setOptions({
      ...options,
      colors: [
        parseFloat(marketSentiment.indiceSnapData.price_change) >= 0
          ? "rgb(16, 145, 33)"
          : "rgb(192, 9, 9)",
      ],
      fill: {
        ...options.fill,
        gradient: {
          ...options.fill.gradient,
          gradientToColors: [
            parseFloat(marketSentiment.indiceSnapData.price_change) >= 0
              ? "rgba(16, 145, 33, 0.3)"
              : "rgba(192, 9, 9, 0.3)",
          ],
        },
      },
    });
  };

  const formatNumber = (num) => {
    return parseFloat(num).toFixed(2);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const isMarketUp =
    marketSentiment &&
    parseFloat(marketSentiment.indiceSnapData.price_change) >= 0;
  const textColor = {
    color: isMarketUp ? "rgb(16, 145, 33)" : "rgb(192, 9, 9)",
  };
  const arrowClass = isMarketUp
    ? "arrowIndicator arrow-up-green"
    : "arrowIndicator arrow-down-red";

  return (
    <>
      <section>
        <div className="container">
          <div className="stock-details-container">
            <h2>{title} Stock Price</h2>
            <div className="updated_subpage">
              <h4>Updated: {new Date().toLocaleString()}</h4>
            </div>
            <div className="box_middle">
              <div className="graph_ahead">
                <ul>
                  <li className="d-value fc">
                    <span>
                      <span className="value">
                        {formatNumber(marketSentiment.indiceSnapData.ltp)}
                      </span>
                      <span className={arrowClass}></span>
                    </span>
                    <span className="change_perc" style={textColor}>
                      {formatNumber(
                        marketSentiment.indiceSnapData.price_change
                      )}{" "}
                      (
                      {formatNumber(
                        marketSentiment.indiceSnapData.price_change_per
                      )}
                      %)
                    </span>
                  </li>
                  <li className="open fc">
                    <span className="Open">Open</span>
                    <span className="d_open">
                      {formatNumber(marketSentiment.indiceSnapData.today_open)}
                    </span>
                  </li>
                  <li className="high fc">
                    <span className="High">High</span>
                    <span className="d_high">
                      {formatNumber(marketSentiment.indiceSnapData.day_high)}
                    </span>
                  </li>
                  <li className="low fc">
                    <span className="Low">Low</span>
                    <span className="d_low">
                      {formatNumber(marketSentiment.indiceSnapData.day_low)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="chart_container subpage_chart">
              <Chart
                options={options}
                series={[{ name: "Market Price", data: chartData.values }]}
                type="area"
                height="220px"
              />
            </div>
          </div>
          <div>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum
              a mollitia magnam sint dolorem, maiores ab fuga atque molestiae
              dignissimos impedit adipisci error enim, repellendus magni
              perferendis quam doloribus debitis? Facere, error veritatis ipsum
              iure magnam aliquam exercitationem dolorum quibusdam dolorem
              omnis, aperiam, corrupti nulla sit totam nemo. Nobis nam optio
              inventore nihil a omnis quibusdam reprehenderit itaque, explicabo
              molestias. Nemo quibusdam repudiandae ratione sed eaque sequi
              saepe error veniam similique ipsum, nobis quia nostrum quod
              ducimus minima repellat tempora rerum nulla magnam eveniet
              consectetur officia. Accusantium nostrum perspiciatis consequatur!
              Quasi iure incidunt ex atque praesentium. Dolore in provident,
              nesciunt reprehenderit rem quam suscipit, consequatur dolorum qui
              maxime quas deserunt, necessitatibus molestias hic enim. Illo
              incidunt officia velit explicabo dolores! Porro veritatis
              excepturi, eaque explicabo autem commodi laudantium placeat
              nostrum temporibus, asperiores illo voluptate, dolorum quae ipsum
              eligendi doloremque ad accusamus velit vel? Harum nulla asperiores
              consequatur delectus tempora voluptate. Iusto saepe autem dolor
              repellat possimus consectetur dicta incidunt eos qui deleniti quos
              minima tenetur animi voluptas, officiis amet quasi id laudantium
              culpa! Beatae, quod? Velit aspernatur adipisci deserunt voluptate.
              Dignissimos eaque exercitationem velit quidem atque odit possimus
              cupiditate, veritatis beatae. Doloremque fugiat, repudiandae
              expedita officiis iste assumenda! Ad, velit? Sapiente mollitia nam
              repellendus quia, alias aspernatur maiores neque ipsum. Minus
              sequi delectus vel, et impedit, consequatur saepe ducimus dicta in
              alias dolore blanditiis suscipit! Est dicta fugit qui eum aperiam
              quisquam praesentium sapiente eos. Officia in optio nisi
              asperiores. Nam eum itaque maxime quam repellat eius delectus
              quisquam distinctio, similique labore accusamus ipsum enim optio
              voluptas esse voluptatem dicta soluta minima voluptate temporibus,
              a quos. Reprehenderit suscipit tempora quia! Placeat error, minus
              mollitia labore animi, necessitatibus maxime reiciendis quae
              alias, fugit soluta doloribus explicabo officiis facere excepturi!
              Delectus ex impedit accusantium odit optio iste earum
              exercitationem animi odio dolores. Distinctio quo, possimus quam
              hic deserunt ex quae sequi nemo pariatur amet vero tenetur commodi
              dolor veritatis delectus nihil eius earum ab quis ipsam adipisci
              aut aliquam autem iure? Ipsa? Error odit dolor eos, ea aut quos
              autem doloribus in perferendis hic laboriosam itaque cumque
              reprehenderit repellat voluptatum, quas maiores dolores? Itaque
              quae praesentium culpa? Id minima impedit assumenda natus? Qui
              perferendis rem repellat soluta praesentium illo culpa dolorem
              quod fugiat impedit delectus, reprehenderit nisi, amet eaque
              dolore doloribus corrupti similique, odio est nemo! Eveniet ea
              molestias quisquam culpa perferendis? Officia labore nisi,
              quibusdam perspiciatis, esse, rerum modi deleniti molestiae fugiat
              cupiditate porro. Consequatur labore voluptas, maxime laboriosam
              eaque officia temporibus, error dicta laudantium doloremque
              similique fuga pariatur quos corporis. Quos voluptates at dicta in
              ea consequuntur. Praesentium excepturi ex eveniet reprehenderit
              nisi maxime ipsum, commodi blanditiis reiciendis incidunt ipsam
              doloribus animi dolor adipisci neque doloremque quaerat, sunt nemo
              corporis. Libero cum exercitationem culpa ipsa neque odio
              consectetur sit alias quod quo! Vero possimus, doloribus laborum
              voluptates quod quos, fugiat et inventore vitae atque modi
              sapiente maxime eligendi laudantium repellendus. Totam eligendi
              odit consectetur. Esse, mollitia! Ullam, vel similique perferendis
              tempora delectus vero eaque debitis exercitationem laudantium iure
              animi expedita odit soluta quibusdam praesentium, laboriosam
              distinctio officia accusamus. Consequuntur, qui. Quisquam iusto
              dignissimos ducimus aliquid dolorem, reiciendis illo veniam
              aspernatur! Possimus rerum eum quisquam, eius laboriosam vero
              officiis molestiae accusamus harum dolore exercitationem delectus
              ad id temporibus nesciunt velit ullam. Alias vero, molestias
              blanditiis incidunt ratione magnam voluptas laudantium beatae
              eveniet qui fugit reprehenderit aperiam commodi expedita harum
              non? Voluptatibus error iusto maiores odio provident veritatis
              nobis rem non optio! Laboriosam neque asperiores sed amet possimus
              libero ut ducimus facilis, dignissimos odio placeat excepturi
              labore similique sit debitis? Cumque sapiente, reprehenderit
              consequuntur in consectetur deleniti iste facilis eum a debitis.
              Nam recusandae, voluptatem error reiciendis sapiente in eaque
              soluta explicabo nihil! Commodi, maiores voluptatem, ad suscipit
              error, mollitia deserunt officiis nulla dolorum quam rem doloribus
              voluptates eligendi ea ut aspernatur. Incidunt quod iure nam
              explicabo quos minus eos dolorum quasi reiciendis, sequi hic
              molestias sapiente modi sunt vel reprehenderit perferendis ab sint
              odio. Ipsum illo atque quo cum, libero sequi! Suscipit nostrum
              illum molestias nesciunt ullam quam eveniet, perspiciatis
              laudantium eius asperiores voluptatem aut quaerat consequatur
              reiciendis veritatis quae deleniti numquam quod ad consequuntur?
              Ullam animi voluptate incidunt id placeat. Provident, impedit ea.
              Animi, qui beatae. Expedita odio omnis cumque voluptas, quaerat
              quia iure? Illum porro inventore deleniti quae eligendi
              exercitationem laboriosam, totam ducimus assumenda minima vel,
              quidem mollitia expedita! Autem, est doloremque impedit veniam
              nostrum ducimus blanditiis! Alias voluptas debitis sint illum esse
              modi mollitia nulla nihil omnis doloribus ex expedita beatae,
              delectus at nam porro ipsa nostrum voluptates. Saepe sapiente
              aperiam blanditiis dolore provident laudantium? Quaerat iure id
              voluptatibus ipsa dolor, corporis laudantium cumque doloremque,
              optio odio sit, unde aperiam totam. Dolores tempore dolorem
              nostrum. Velit, et iste. Quis, eos vero velit, ducimus quos est
              fuga quae ipsam repellat libero deleniti suscipit hic placeat
              modi, saepe et asperiores ipsa? Maxime, voluptatem? Quaerat,
              fugiat ea? Molestiae ipsa nostrum doloremque? Eos expedita quo
              fuga assumenda debitis alias vitae maxime aspernatur quas sed quam
              quis maiores fugiat atque, modi voluptatibus incidunt saepe
              repellat ea autem eaque cum exercitationem, a voluptatum. Ratione!
              Sint officiis explicabo perferendis velit id mollitia voluptatibus
              tempora, aspernatur fugit libero itaque cum numquam iusto quia?
              Sapiente necessitatibus excepturi magnam consequuntur quis
              cupiditate dolores labore, temporibus rerum delectus atque. Vero
              accusantium laudantium sapiente corrupti placeat quam, aliquam
              nemo explicabo et exercitationem aliquid molestias necessitatibus
              rem sed doloremque a corporis facere ut excepturi odio illo
              quaerat veritatis ipsam. Laborum, quos!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Stockboxsubpage;
