package md.org.home.stub.config;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.hibernate.jpa.HibernatePersistenceProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.core.env.Environment;

import javax.annotation.Resource;
import javax.sql.DataSource;
import java.beans.PropertyVetoException;
import java.util.Properties;

@Configuration
@ComponentScan(basePackages = "md.org.home.stub")
@PropertySource("classpath:application.properties")
@EnableTransactionManagement
@EnableJpaRepositories (basePackages = "md.org.home.stub", entityManagerFactoryRef = "entityManagerFactoryBean")
public class ApplicationConfiguration {

    private static final String PROPERTY_NAME_DATABASE_DRIVER = "db.driver";
    private static final String PROPERTY_NAME_DATABASE_URL = "db.url";
    private static final String PROPERTY_NAME_DATABASE_USERNAME = "db.username";

    private static final String PROPERTY_NAME_HIBERNATE_DIALECT = "hibernate.dialect";
    private static final String PROPERTY_NAME_HIBERNATE_FORMAT_SQL = "hibernate.format_sql";
    private static final String PROPERTY_NAME_HIBERNATE_SHOW_SQL = "hibernate.show_sql";
    private static final String REPORTS_PATH = "reports.path";

    private static final String C3P0_INITIAL_POOL_SIZE = "c3p0.initialPoolSize";
    private static final String C3P0_MIN_POOL_SIZE = "c3p0.minPoolSize";
    private static final String C3P0_MAX_POOL_SIZE = "c3p0.maxPoolSize";
    private static final String C3P0_IDLE_TEST_PERIOD = "c3p0.idleTestPeriod";
    private static final String C3P0_MAX_IDLE_TIME = "c3p0.timeout";
    private static final String C3P0_ACQUIRE_INCREMENT = "c3p0.acquireIncrement";
    private static final String C3P0_NUM_HELPER_THREADS = "c3p0.numHelperThreads";

    @Resource
    private Environment environment;

    @Bean
    public DataSource dataSource() throws PropertyVetoException {
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        dataSource.setDriverClass(environment.getRequiredProperty(PROPERTY_NAME_DATABASE_DRIVER));
        dataSource.setJdbcUrl(environment.getRequiredProperty(PROPERTY_NAME_DATABASE_URL));
        dataSource.setUser(environment.getRequiredProperty(PROPERTY_NAME_DATABASE_USERNAME));

        // c3p0
        dataSource.setInitialPoolSize(Integer.parseInt(environment.getRequiredProperty(C3P0_INITIAL_POOL_SIZE)));
        dataSource.setMinPoolSize(Integer.parseInt(environment.getRequiredProperty(C3P0_MIN_POOL_SIZE)));
        dataSource.setMaxPoolSize(Integer.parseInt(environment.getRequiredProperty(C3P0_MAX_POOL_SIZE)));
        dataSource.setIdleConnectionTestPeriod(Integer.parseInt(environment.getRequiredProperty(C3P0_IDLE_TEST_PERIOD)));
        dataSource.setMaxIdleTime(Integer.parseInt(environment.getRequiredProperty(C3P0_MAX_IDLE_TIME)));
        dataSource.setAcquireIncrement(Integer.parseInt(environment.getRequiredProperty(C3P0_ACQUIRE_INCREMENT)));
        dataSource.setNumHelperThreads(Integer.parseInt(environment.getRequiredProperty(C3P0_NUM_HELPER_THREADS)));

        return dataSource;
    }

    @Bean
    public JpaTransactionManager transactionManager() throws ClassNotFoundException, PropertyVetoException {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactoryBean().getObject());
        transactionManager.setNestedTransactionAllowed(true);
        return transactionManager;
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactoryBean() throws ClassNotFoundException, PropertyVetoException {
        LocalContainerEntityManagerFactoryBean entityManagerFactoryBean = new LocalContainerEntityManagerFactoryBean();
        entityManagerFactoryBean.setDataSource(dataSource());
        entityManagerFactoryBean.setPackagesToScan("md.org.home.stub.entity");
        entityManagerFactoryBean.setPersistenceProviderClass(HibernatePersistenceProvider.class);
        Properties jpaProterties = new Properties();
        jpaProterties.put(PROPERTY_NAME_HIBERNATE_DIALECT, environment.getRequiredProperty(PROPERTY_NAME_HIBERNATE_DIALECT));
        jpaProterties.put(PROPERTY_NAME_HIBERNATE_FORMAT_SQL, environment.getRequiredProperty(PROPERTY_NAME_HIBERNATE_FORMAT_SQL));
        jpaProterties.put(PROPERTY_NAME_HIBERNATE_SHOW_SQL, environment.getRequiredProperty(PROPERTY_NAME_HIBERNATE_SHOW_SQL));

        jpaProterties.put("hibernate.hbm2ddl.auto", "update");

        entityManagerFactoryBean.setJpaProperties(jpaProterties);
        return entityManagerFactoryBean;
    }

    @Bean(name = "reportsPath")
    public String getReportsPath() {
        return environment.getRequiredProperty(REPORTS_PATH);
    }



}