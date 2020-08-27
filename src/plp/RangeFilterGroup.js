import PropTypes from 'prop-types'
import React, { useMemo, useContext, useState } from 'react'
import { Checkbox, FormGroup, Typography, FormControlLabel, Slider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchResultsContext from './SearchResultsContext'

const styles = theme => ({
  /**
   * Styles applied to the matching text.
   */
  matches: {
    marginLeft: '5px',
    display: 'inline',
  },
  /**
   * Styles applied to the group label element.
   */
  groupLabel: {
    display: 'flex',
    alignItems: 'center',
  },
})

const useStyles = makeStyles(styles, { name: 'RSFRangeFilterGroup' })

/**
 * A UI for grouping filters using a slider.
 */
export default function RangeFilterGroup(props) {
  const { group, submitOnChange } = props
  const {
    pageData: { filters },
    actions: { toggleFilter },
  } = useContext(SearchResultsContext)
  const [value, setValue] = useState([0, 100]);
  const classes = useStyles(props.classes)
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <FormGroup>
        <Slider
          value={value}
          min={0}
          max={100}
          step={1}
          aria-labelledby="discrete-slider-always"
          valueLabelDisplay="auto"
          onChange={handleChange}
          getAriaValueText={(val) => `${val}%`}
          marks={[
            {
              value: 0,
              label: '0%',
            },
            {
              value: 100,
              label: '100%',
            }
          ]}
        />
        
      </FormGroup>
      // <FormGroup>
      //   {group.options.map((facet, i) => (
      //     <FormControlLabel
      //       key={i}
      //       label={
      //         <div className={classes.groupLabel}>
      //           <span>{facet.name}</span>
      //           <Typography variant="caption" className={classes.matches} component="span">
      //             ({facet.matches})
      //           </Typography>
      //         </div>
      //       }
      //       control={
      //         <Checkbox
      //           checked={filters.indexOf(facet.code) !== -1}
      //           color="primary"
      //           onChange={() => toggleFilter(facet, submitOnChange)}
      //         />
      //       }
      //     />
      //   ))}
      // </FormGroup>
  )
}

RangeFilterGroup.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * Contains data for the group to be rendered.
   */
  group: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string,
        matches: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        image: PropTypes.object,
      }),
    ),
  }),
  /**
   * Set to `true` to refresh the results when the user toggles a filter.
   */
  submitOnChange: PropTypes.bool,
}
